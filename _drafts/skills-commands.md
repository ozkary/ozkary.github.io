
# Beyond the persona - mastering agents skills and commands

Your agent's persona was never meant to carry your entire domain knowledge. As teams bring AI into real data engineering workflows—handling shifting ingestion feeds, inferring schemas, and standardizing lakehouse partitions—a single system instructions file quickly becomes a tangled mess of identity, procedure, and governance. It becomes hard to reuse, hard to reason about, and impossible to trust in production data pipelines.

The fix is simpler than it sounds: skills teach an agent what it knows, commands give it something it can just do. Everything else follows from that distinction. A deterministic data pipeline command executes predictable steps automatically, invoking an AI skill only when genuine judgment is required—like when an unfamiliar telemetry payload arrives with an unmapped schema.

In this practical, pattern-driven session, we will take a monolithic data agent and refactor it into an enterprise-grade modular system:

Commands orchestrate predictable ingestion steps end-to-end without wasting LLM tokens.

Skills step in dynamically to infer unknown schemas, map data contracts, and draft transformation rules.

Hooks gate sensitive mutations—enforcing human sign-off before raw data reaches staging buckets or analytical tables, and remembering the approved schema so future batches run at wire speed.

Whether you are an aspiring engineer curious about production AI or a seasoned developer scaling data infrastructure, you'll walk away with an architectural blueprint to build agents that are maintainable, auditable, and production-ready.

Agenda
The Monolith Agent — The Real-World Ingestion Problem

A working data agent built the common way: one massive instructions file trying to juggle agent identity, file format checks, SQL DDL standards, and security policies. Real code, not a toy example.

Why Monoliths Break Data Pipelines

Context bloat, tight coupling, and undefined ownership. Why treating prompt engineering as an application layer inevitably fails when schema drift and high-throughput data hit.

What is an Agent SKILL.md?

A skill teaches domain judgment that the model applies only when summoned. We’ll dissect the anatomy of an operational skill manifest containing instructions, templates, and scoped tools.

What is an Agent Command?

A command executes deterministic workflows. It manages step-by-step pipeline orchestration natively and calls out to an LLM skill only when semantic reasoning is strictly necessary.

Judgment vs. Execution: Skills and Commands in Practice

Separating the fast path from the reasoning path: a known data file processes deterministically with zero LLM overhead; an unfamiliar payload triggers the schema inference skill for that single decision step.

Guardrail Hooks and Human-in-the-Loop

Deterministic gates that intercept execution before any storage or warehouse mutation occurs. Why human approval and programmatic payload validation are two distinct guarantees that must work in tandem.

Live Walkthrough: Refactoring Monolith to Modular Data Agent

Tracing the patterns in action:

Fast Path: A known payload processes instantly with no LLM invocation.

Judgment Path: An unmapped telemetry feed triggers the skill, drafts a target schema, and halts at a security hook for human sign-off.

Learning Loop: Once approved, the agent registers the pattern so subsequent matching files fly straight through.

From Approved Decision to Deployed Pipeline (Architecture Walkthrough)

What happens after human sign-off: turning an ad-hoc AI decision into a reviewed, version-controlled, and deployed pipeline asset in Git.

What This Buys You & The Road Ahead

Cleaner architecture, zero context waste, and safe extensibility without touching the core runtime engine. A look ahead at scaling from single modular agents to distributed agent mesh architectures.

```text
agent → command (checks fingerprint) → unmatched, returns control to agent → agent loads skill, drafts DDL → agent calls command again (writes the draft) → hook → human approval → resume: strategy → MCP toolset → hook → BigQuery
```


```text
adk/
├── skills/
│   ├── data_discovery/
│   │   └── SKILL.md             # Knowledge: Schema inference rules, type mapping, anomaly detection
│   └── bq/
│       └── SKILL.md             # Knowledge: BigQuery external table rules, partitioning standards, governance
│
├── commands/
│   ├── process_gcs_file.py      # Execution: Reads incoming file, checks schema registry, routes flow
│   └── create_external_table.py # Execution: Renders DDL from approved schema and executes via tool
│
├── tools/
│   ├── gcs/                     # SDK wrappers: read_blob, list_blobs
│   └── bq/                      # SDK wrappers: execute_ddl, table_exists
│
└── agents/
    └── skill_agent/
        ├── agent.py             # Agnostic runner: mounts skill on demand
        ├── skill_loader.py      # Parses SKILL.md & enforces tool allowlists
        └── hook_binder.py       # Intercepts flow: warns and pauses for HITL approval
```

## Prompt

You are an expert enterprise AI architect working within our Agent Development Kit (ADK) workspace.

### Objective
Implement the decoupled `skill_agent` architecture strictly adhering to the following boundaries:
- Skills teach what the agent knows (analysis, rules, governance). Skills NEVER generate raw executable code.
- Commands execute deterministic workflows (file checks, DDL rendering, tool invocation).
- The workflow stops after Human-in-the-Loop (HITL) approval. Check-in gates and deployment are out of scope for implementation.

### Deliverables & File Requirements

1. **Skills (`adk/skills/`):**
   - **`data_discovery/SKILL.md`**:
     - YAML Frontmatter: Name, version, spec_signature, allowed tools (`tools/gcs`).
     - Markdown Body: Standard Operating Procedure for inspecting file headers, identifying data formats, and mapping types (e.g., unix epoch to TIMESTAMP, numeric sensor readings to FLOAT64). Emits a structured schema decision object.
   - **`bq/SKILL.md`**:
     - YAML Frontmatter: Name, version, spec_signature, governance rules.
     - Markdown Body: BigQuery external table policies: mandatory date partitioning (`_PARTITIONDATE`), table naming conventions, and partition expiration rules.

2. **Commands (`adk/commands/`):**
   - **`process_gcs_file.py`**:
     - Reads new file from GCS using `tools/gcs`.
     - Checks an in-memory or local schema cache.
     - If known: proceeds directly.
     - If unknown: triggers `skill_agent` with `data_discovery` and `bq` skills.
   - **`create_external_table.py`**:
     - Takes an approved schema object, injects it into a standard DDL template string, and runs it via `tools/bq`.

3. **Agent Runtime (`adk/agents/skill_agent/`):**
   - **`skill_loader.py`**: Reads `SKILL.md`, verifies spec signature, and loads only the allowed tools into the active execution envelope.
   - **`hook_binder.py`**: Pre-use interceptor that displays the inferred schema, issues a warning, and halts execution for explicit user confirmation (HITL).
   - **`agent.py`**: Agnostic runner that mounts the requested skill, processes the input, and returns the verified schema decision.

4. **Tools (`adk/tools/`):**
   - **`gcs/`**: Basic reader tool (`read_file_sample`).
   - **`bq/`**: Basic DDL execution tool (`execute_ddl`).

Please output clean, modular Python and Markdown files following these exact boundaries.