
# Beyond the persona - mastering agents skills and commands

Your agent's persona was never meant to carry your entire domain knowledge. As agents take on more responsibility, a single instructions file grows into a tangled mix of identity, procedure, and policy — hard to reuse, hard to reason about, and hard to trust.

The fix is simpler than it sounds: skills teach an agent what it knows, commands give it something it can just do. That's the whole idea. Everything else — how they're structured, when each one applies — follows from that one distinction.

We'll take a working agent persona built as a monolith and refactor it into a modular structure: declarative SKILL.md manifests for domain knowledge, explicit commands for one-off actions, and hooks that gate anything sensitive — enforcing human-in-the-loop approval no matter which skill or command triggered the request. The agent that comes out the other side knows more, does more, and stays extendable at enterprise grade — new domain knowledge and new actions slot in without ever touching the core execution engine.

Final agenda

1. The monolith agent — the problem
A working agent, one instructions file doing everything — identity, schema handling, policy. Real, not a strawman.

2. Why monoliths don't scale
Context bloat, tight coupling, no clear ownership — the three failure modes that force this rethink.

3. What is an agent SKILL.md
A skill teaches — judgment the model applies only when a task calls for it. Anatomy of a real one.

4. What is an agent command
A command executes — a deterministic action for a decision that's already been made. How it differs from a skill, and why that difference is the whole point.

5. Judgment vs. execution: skills and commands together
Same file, two outcomes: a known schema goes straight to a command, an unfamiliar one needs a skill's judgment first. A skill's output is always a decision, never code.

6. Hooks and human-in-the-loop
The one gate that runs the same way regardless of path. What happens when a file matches nothing at all — and why that itself is a signal worth escalating.

7. Live refactor: monolith to modular skill agent (demo)
Rebuilding the agent live: skills in, commands in, hooks gating both. A known file runs the fast command path with no LLM call. An unknown file triggers the skill, which proposes a decision — and the hook stops it there for approval.

8. From approved decision to deployed capability (slides only)
What happens after a human approves that decision — how it becomes a real, tested, permanent command. Narrated, not demoed — the full delivery pipeline is its own talk.

9. What this buys you
Knows more, does more, and extends without ever touching the core execution engine — plus a look ahead at what "deployed" means once we take this agent into production.

Why the split at section 7/8 works

Ending the live portion right after the hook fires on the unknown file is actually a stronger demo beat than pushing further — the audience sees the exact moment where the system correctly refuses to guess, which is the entire thesis of pairing skills with hooks. Section 8 then closes the loop narratively without asking you to fake a GitHub integration live, and section 9's teaser of the deployment talk lands naturally because the audience just watched the system produce something that clearly needs to go somewhere — you're answering a question they'll already be asking.

```text
adk/
├── tools/
│   ├── bq/                        # ddl_validator, run_query
│   ├── gcs/                       # create_bucket, upload_file, read_file
│   └── security/                  # verify_signature, quarantine_file — atomic crypto ops
│
├── skills/
│   ├── bq/
│   │   ├── SKILL.md                # DDL rules, partition assertions, naming conventions
│   │   └── templates/
│   ├── gcs/
│   │   ├── SKILL.md                # storage class, naming rules, bucket policies
│   │   └── templates/
│   └── security/
│       └── SKILL.md                # audit sign-off SOP, escalation wording (NOT the crypto gate)
│
├── commands/                       # NEW — deterministic, explicitly invoked
│   ├── create-external-table.md    # packages DDL from bq skill output → bq tool
│   ├── create-bucket.md            # packages request from gcs skill output → gcs tool
│   └── audit-report.md             # formats a sign-off record using security skill's SOP
│
└── agents/
    ├── secured_agent/               # baseline monolith — talk 1 artifact, kept for comparison
    └── skill_agent/
        ├── agent.py                 # orchestrator core: registers persona, tools, skills, commands
        ├── skill_loader.py          # parses SKILL.md, matches triggers, progressive disclosure
        ├── command_router.py        # NEW — resolves /command → tool call, no model judgment
        └── hook_binder.py           # binds PreToolUse hooks: security signature gate (Layer 1) + WARN/HITL policy gate (Layer 3) on bq/gcs tools
```