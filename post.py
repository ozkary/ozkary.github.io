import os
import sys
from pathlib import Path
import yaml
import requests
from dotenv import load_dotenv, find_dotenv
from atproto import Client, client_utils

# ==========================================
# 0. LOAD ENVIRONMENT VARIABLES
# ==========================================
load_dotenv(find_dotenv())

# ==========================================
# 1. PARSE MARKDOWN FRONTMATTER
# ==========================================
def parse_post(file_path: str):
    path_obj = Path(file_path)
    if not path_obj.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    with open(path_obj, "r", encoding="utf-8") as f:
        content = f.read()

    parts = content.split("---", 2)
    if len(parts) < 3:
        raise ValueError("Invalid Markdown format: Frontmatter delimiters (---) not found.")

    frontmatter = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()

    # Determine post name / slug for saving
    post_slug = path_obj.stem

    # Fallback canonical URL
    if not frontmatter.get("canonical_url"):
        base_url = os.getenv("BASE_CANONICAL_URL", "https://ozkary.com/posts")
        frontmatter["canonical_url"] = f"{base_url}/{post_slug}"

    return frontmatter, body, post_slug

# ==========================================
# 2. GENERATE CHANNEL PAYLOADS
# ==========================================
def build_payloads(meta: dict):
    title = meta.get("title", "New Architecture Guide")
    excerpt = meta.get("excerpt", "")
    url = meta.get("canonical_url", "https://ozkary.com")
    repo = meta.get("repo_url", "")
    video_id = meta.get("video_id", "")
    raw_tags = meta.get("tags", [])
    tags = " ".join([f"#{str(t).replace('-', '')}" for t in raw_tags[:5]])

    # 1. Kit.com Email HTML Body
    kit_html = f"""<h2>{title}</h2>
<p>{excerpt}</p>
<hr/>
<h3>Key Highlights:</h3>
<ul>
    <li>Threat modeling & vulnerability breakdown</li>
    <li>Zero-Trust Policy Enforcement Points (PEP) implementation</li>
    <li>Cryptographic validation & Human-in-the-Loop workflows</li>
</ul>
"""
    if repo:
        kit_html += f'<p>💾 <strong>Source Code:</strong> <a href="{repo}">{repo}</a></p>\n'
    if video_id:
        kit_html += f'<p>📺 <strong>Session Video:</strong> <a href="https://youtu.be/{video_id}">Watch on YouTube</a></p>\n'

    kit_html += f"""<p style="margin-top: 25px;">
    <a href="{url}" style="background-color: #0070f3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        Read Complete Deep Dive on ozkary.com &rarr;
    </a>
</p>
"""

    # 2. LinkedIn Post / Article Copy
    linkedin_text = f"""{title} 🛡️🤖

{excerpt}

In this architectural breakdown:
🔹 Zero-trust security boundaries for autonomous agents
🔹 Cryptographic signatures & vault secret isolation
🔹 Policy Enforcement Points (PEP) and pre-tool inspection hooks
"""
    if repo:
        linkedin_text += f"\n📂 GitHub Repo: {repo}"
    if video_id:
        linkedin_text += f"\n📺 Video Recording: https://youtu.be/{video_id}"

    linkedin_text += f"\n\n👉 Read the complete guide with architectural patterns on ozkary.com:\n🔗 {url}\n\n{tags}"

    # 3. Bluesky Micro-post (<300 chars)
    bluesky_text = f"🛡️ {title}\n\n{excerpt[:135]}...\n\nRead more on ozkary.com:"

    # 4. X (Twitter) Thread
    x_thread = [
        f"🛡️ How do you secure autonomous AI agents against prompt injections & rogue execution?\n\n{title} 🧵👇",
        f"{excerpt}",
        f"Full architectural guide, source code, and patterns are live on the hub:\n🔗 {url}\n\n{tags}"
    ]

    return {
        "kit": {"subject": f"[Deep Dive] {title}", "html": kit_html.strip()},
        "linkedin": linkedin_text.strip(),
        "bluesky": {"text": bluesky_text.strip(), "link": url, "title": title, "desc": excerpt},
        "x": x_thread
    }

# ==========================================
# 3. EXPORT PAYLOADS TO SHARED FILE
# ==========================================
def save_payload_file(post_slug: str, meta: dict, payloads: dict):
    shared_dir = Path("shared")
    shared_dir.mkdir(parents=True, exist_ok=True)
    out_file = shared_dir / f"{post_slug}.txt"

    content = f"""================================================================================
POST TITLE: {meta.get('title')}
CANONICAL URL: {meta.get('canonical_url')}
================================================================================

--------------------------------------------------------------------------------
1. KIT.COM EMAIL BROADCAST
--------------------------------------------------------------------------------
SUBJECT: {payloads['kit']['subject']}

HTML CONTENT:
{payloads['kit']['html']}

--------------------------------------------------------------------------------
2. LINKEDIN POST / NEWSLETTER COPY
--------------------------------------------------------------------------------
{payloads['linkedin']}

--------------------------------------------------------------------------------
3. BLUESKY POST
--------------------------------------------------------------------------------
TEXT: {payloads['bluesky']['text']}
LINK: {payloads['bluesky']['link']}

--------------------------------------------------------------------------------
4. X (TWITTER) THREAD
--------------------------------------------------------------------------------
"""
    for i, tweet in enumerate(payloads["x"], 1):
        content += f"\n[Tweet {i}]:\n{tweet}\n"

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"💾 Distribution bundle saved to: {out_file.resolve()}")

# ==========================================
# 4. API DISPATCHERS (GRACEFUL FALLBACK)
# ==========================================
def create_kit_draft(payload: dict):
    kit_key = os.getenv("KIT_API_KEY")
    if not kit_key:
        print("⚠️  [KIT] KIT_API_KEY not found. Skipped API call (use manual copy).")
        return

    try:
        res = requests.post(
            "https://api.kit.com/v4/broadcasts",
            headers={"X-Kit-Api-Key": kit_key, "Content-Type": "application/json"},
            json={
                "subject": payload["subject"],
                "content": payload["html"],
                "public": False
            },
            timeout=10
        )
        if res.status_code in [200, 201]:
            print("✅ [KIT] Broadcast draft created successfully.")
        else:
            print(f"❌ [KIT] Failed: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"❌ [KIT] Request error: {e}")

def publish_bluesky(payload: dict):
    handle = os.getenv("BSKY_HANDLE")
    password = os.getenv("BSKY_APP_PASSWORD")
    if not handle or not password:
        print("⚠️  [BLUESKY] Credentials missing. Skipped API call (use manual copy).")
        return

    try:
        client = Client()
        client.login(handle, password)
        text = client_utils.TextBuilder().text(payload["text"] + " ").link(payload["title"][:30] + "...", payload["link"])
        client.send_post(text)
        print("✅ [BLUESKY] Post published successfully.")
    except Exception as e:
        print(f"❌ [BLUESKY] Publishing failed: {e}")

# ==========================================
# 5. MAIN ENTRY POINT
# ==========================================
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python distribute_post.py <path_to_markdown_file>")
        sys.exit(1)

    file_path = sys.argv[1]
    meta, _, slug = parse_post(file_path)
    payloads = build_payloads(meta)

    # Always write to shared file first
    save_payload_file(slug, meta, payloads)

    # Attempt automatic API distribution
    print("\n--- ATTEMPTING API BROADCASTS ---")
    create_kit_draft(payloads["kit"])
    publish_bluesky(payloads["bluesky"])