
# Beyond the persona - mastering agents skills and commands

Your agent's persona was never meant to carry your entire domain knowledge. As agents take on more responsibility, a single instructions file grows into a tangled mix of identity, procedure, and policy — hard to reuse, hard to reason about, and hard to trust.

The fix is simpler than it sounds: skills teach an agent what it knows, commands give it something it can just do. That's the whole idea. Everything else follows from that one distinction — including the fact that a command doesn't have to skip judgment entirely, it just decides when judgment is actually needed and calls on a skill only for that part.

We'll take a working agent persona built as a monolith and refactor it into a modular structure: a command that orchestrates the workflow end to end, a skill it calls on only when a file doesn't match anything the agent has seen before, and hooks that gate the sensitive step no matter how the request got there — enforcing human-in-the-loop approval, then remembering the outcome so the next matching file skips straight through. The agent that comes out the other side knows more, does more, and stays extendable at enterprise grade — new domain knowledge and new capability slot in without ever touching the core execution engine.

1. The monolith agent — the problem
A working agent, one instructions file doing everything — identity, schema handling, policy. Real, not a strawman.

2. Why monoliths don't scale
Context bloat, tight coupling, no clear ownership — the three failure modes that force this rethink.

3. What is an agent SKILL.md
A skill teaches — judgment the model applies only when a task calls for it. Anatomy of a real one.

4. What is an agent command
A command executes — a deterministic workflow that knows its own steps, and calls on a skill only for the one step that needs judgment.

5. Judgment vs. execution: skills and commands together
A known file skips judgment entirely. An unfamiliar one triggers the skill for exactly one step — drafting the decision — nothing more.

6. Hooks and human-in-the-loop
The gate that runs the same way regardless of path — and still checks the actual payload even after a human has approved it, because approval and verification are two different guarantees.

7. Live refactor: monolith to modular skill agent (demo)
A known file runs the fast path, no LLM call. An unfamiliar file triggers the skill, drafts a schema, halts for approval — and once approved, the agent remembers, so the next matching file never pauses again.

8. From approved decision to deployed capability (slides only)
What happens after a human approves — how a one-time decision becomes permanent, reviewed, deployed capability. Narrated, not demoed.

9. What this buys you
Knows more, does more, and extends without touching the core execution engine — plus a look ahead at what "deployed" means once we take this agent into production.

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