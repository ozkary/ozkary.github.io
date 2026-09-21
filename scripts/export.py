#!/usr/bin/env python3
"""
export.py - Export Markdown post/event to clean HTML and Markdown for syndication.

Features:
- Strips YAML frontmatter completely from HTML and MD exports.
- Computes canonical slugs:
    - Strips leading date (YYYY-MM-DD-)
    - Automatically prefixes 'event-' for documents in _events/ if missing
- Resolves relative asset URLs (../../assets/ -> https://www.ozkary.dev/assets/)
- Fixes pandoc quirks (e.g. .jfif files rendered as <embed> converted to <img>)
- Exports to export/<slug>.html and export/<slug>.md
"""

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path

DEFAULT_BASE_URL = "https://www.ozkary.dev"
DEFAULT_OUTPUT_DIR = "export"


def strip_frontmatter(content: str) -> tuple[dict, str]:
    """
    Parses and strips YAML frontmatter from markdown content.
    Returns (frontmatter_dict, markdown_body).
    """
    lines = content.splitlines(keepends=True)
    if not lines or not lines[0].strip().startswith("---"):
        return {}, content

    closing_idx = -1
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            closing_idx = i
            break

    if closing_idx == -1:
        return {}, content

    yaml_text = "".join(lines[1:closing_idx])
    body = "".join(lines[closing_idx + 1:]).lstrip("\r\n")

    frontmatter = {}
    try:
        import yaml
        frontmatter = yaml.safe_load(yaml_text) or {}
    except Exception:
        pass

    return frontmatter, body


def compute_slug(input_path: Path) -> str:
    """
    Computes output slug for the exported file:
    - Strips date prefix (YYYY-MM-DD-)
    - Adds 'event-' prefix if originating from an events folder and not already present
    """
    stem = input_path.stem

    # Strip leading date prefix YYYY-MM-DD-
    stem = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", stem)

    # Check if originating from an events path
    parts = [part.lower() for part in input_path.parts]
    is_event = any("_events" in part or part == "events" for part in parts)

    if is_event and not stem.startswith("event-"):
        stem = f"event-{stem}"

    return stem


def replace_relative_assets(text: str, base_url: str = DEFAULT_BASE_URL) -> str:
    """
    Replaces relative asset references with absolute URLs.
    Example: ../../assets/2026/img.png -> https://www.ozkary.dev/assets/2026/img.png
    """
    base = base_url.rstrip("/")

    # 1. Matches relative parent/current dir assets: (../)+assets/ or ./assets/
    text = re.sub(r"(?:\.\./|\./)+assets/", f"{base}/assets/", text)

    # 2. Matches root-relative /assets/ when not already part of an absolute URL
    text = re.sub(r"(?<![a-zA-Z0-9_\-\.])(?<!/)/assets/", f"{base}/assets/", text)

    # 3. Matches markdown image or link syntax with standalone assets/
    text = re.sub(r'(\]\()assets/', rf'\1{base}/assets/', text)

    # 4. Matches HTML img src="assets/..."
    text = re.sub(r'(src=["\'])assets/', rf'\1{base}/assets/', text)

    return text


def convert_markdown_to_html(markdown_text: str) -> str:
    """
    Converts markdown text to HTML using pandoc (GFM format), with post-processing fixes.
    """
    # Temporarily substitute .jfif with .__jfif__.jpg so pandoc treats it as an image
    # and outputs standard <img> tags with title and alt instead of <embed>
    preprocessed_md = re.sub(r'(\.jfif)(?=[\"\'\)\s])', '.__jfif__.jpg', markdown_text)

    pandoc_cmd = ["pandoc", "-f", "gfm", "--no-highlight", "--mathjax", "-t", "html"]
    try:
        res = subprocess.run(
            pandoc_cmd,
            input=preprocessed_md,
            text=True,
            capture_output=True,
            check=True,
        )
        html = res.stdout
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        sys.stderr.write(f"Warning: pandoc execution failed ({e}), attempting fallback markdown...\n")
        try:
            import markdown
            html = markdown.markdown(markdown_text, extensions=["tables", "fenced_code"])
        except ImportError:
            sys.stderr.write("Error: pandoc is required for markdown conversion.\n")
            raise

    # Restore .jfif extension
    html = html.replace('.__jfif__.jpg', '.jfif')

    # Safety check: replace any stray <embed ... .jfif> with <img>
    def replace_embed(m):
        attrs = m.group(1)
        return f"<img{attrs}/>"

    html = re.sub(
        r'<embed([^>]+src=["\'][^"\']+\.(?:jfif|jpg|jpeg|png|gif|webp|svg)["\'][^>]*)/>',
        replace_embed,
        html,
    )

    return html


def resolve_input_file(raw_path: str) -> Path:
    """
    Finds the markdown file even if specified with leading slash or relative path.
    Avoids searching bloated directories like node_modules or vendor.
    """
    raw = raw_path.strip()

    # 1. Exact path as given
    p = Path(raw)
    if p.is_file():
        return p.resolve()

    # 2. Check if stripping leading slash resolves relative to current working directory
    if raw.startswith("/"):
        p_rel = Path(raw.lstrip("/"))
        if p_rel.is_file():
            return p_rel.resolve()

    # 3. Check direct file in current directory
    p_direct = Path.cwd() / p.name
    if p_direct.is_file():
        return p_direct.resolve()

    # 4. Search in dedicated content directories only
    search_dirs = ["_events", "_posts", "_drafts", "_pages"]
    target_name = p.name

    for d in search_dirs:
        d_path = Path(d)
        if d_path.is_dir():
            matches = list(d_path.glob(f"**/{target_name}"))
            if matches:
                return matches[0].resolve()

    # 5. Search for partial matches (e.g. without date prefix or fuzzy)
    for d in search_dirs:
        d_path = Path(d)
        if d_path.is_dir():
            matches = list(d_path.glob(f"**/*{target_name}*"))
            md_matches = [m for m in matches if m.suffix.lower() == ".md"]
            if md_matches:
                return md_matches[0].resolve()

    return p.resolve()


def export_markdown(
    file_path_str: str,
    output_dir_str: str = DEFAULT_OUTPUT_DIR,
    base_url: str = DEFAULT_BASE_URL,
    skip_html: bool = False,
    skip_md: bool = False,
) -> tuple[Path, Path]:
    """
    Executes the full export workflow.
    """
    input_path = resolve_input_file(file_path_str)
    if not input_path.exists() or not input_path.is_file():
        sys.stderr.write(f"Error: File not found: {file_path_str} (resolved to {input_path})\n")
        sys.exit(1)

    print(f"📄 Processing: {input_path}")

    # Read original content
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Parse & ignore/strip frontmatter YAML block
    frontmatter, body = strip_frontmatter(content)
    if frontmatter:
        title = frontmatter.get("title", "")
        print(f"   ✓ Stripped frontmatter YAML (Title: {title})")
    else:
        print("   ✓ No frontmatter block detected")

    # 2. Replace relative assets
    clean_body = replace_relative_assets(body, base_url=base_url)
    print(f"   ✓ Rewrote relative assets to '{base_url}/assets/'")

    # 3. Compute slug and output directory
    slug = compute_slug(input_path)
    out_dir = Path(output_dir_str).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    html_file = out_dir / f"{slug}.html"
    md_file = out_dir / f"{slug}.md"

    # 4. Generate & save HTML
    if not skip_html:
        html_content = convert_markdown_to_html(clean_body)
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"   ✅ HTML Export saved: {html_file.relative_to(Path.cwd()) if html_file.is_relative_to(Path.cwd()) else html_file}")

    # 5. Save cleaned Markdown
    if not skip_md:
        with open(md_file, "w", encoding="utf-8") as f:
            f.write(clean_body)
        print(f"   ✅ Clean Markdown saved: {md_file.relative_to(Path.cwd()) if md_file.is_relative_to(Path.cwd()) else md_file}")

    return html_file, md_file


def main():
    parser = argparse.ArgumentParser(
        description="Export a markdown file into an HTML page and cleaned Markdown (ignoring YAML frontmatter)."
    )
    parser.add_argument(
        "file",
        nargs="?",
        help="Path to the input markdown file (e.g. _events/somepage.md or _posts/...)",
    )
    parser.add_argument(
        "-f", "--file",
        dest="file_flag",
        help="Alternative flag to specify input file",
    )
    parser.add_argument(
        "-o", "--output-dir",
        default=DEFAULT_OUTPUT_DIR,
        help=f"Target directory for exported files (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "-b", "--base-url",
        default=DEFAULT_BASE_URL,
        help=f"Base URL for absolute assets (default: {DEFAULT_BASE_URL})",
    )
    parser.add_argument(
        "--md-only",
        action="store_true",
        help="Only export cleaned markdown file",
    )
    parser.add_argument(
        "--html-only",
        action="store_true",
        help="Only export HTML file",
    )

    args = parser.parse_args()
    target_file = args.file or args.file_flag

    if not target_file:
        parser.print_help()
        sys.exit(1)

    export_markdown(
        file_path_str=target_file,
        output_dir_str=args.output_dir,
        base_url=args.base_url,
        skip_html=args.md_only,
        skip_md=args.html_only,
    )


if __name__ == "__main__":
    main()
