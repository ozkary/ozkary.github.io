# Overview

Your agent's persona was never meant to carry your entire domain knowledge. As teams bring AI into real data engineering workflows—handling shifting ingestion feeds, inferring schemas, and standardizing lakehouse partitions—a single system instructions file quickly becomes a tangled mess of identity, procedure, and governance. It becomes hard to reuse, hard to reason about, and impossible to trust in production data pipelines.

The fix is simpler than it sounds: **skills teach an agent what it knows, commands give it something it can do.** Everything else follows from that distinction. A deterministic data pipeline command executes predictable steps automatically, invoking an AI skill only when genuine judgment is required—like when an unfamiliar data payload arrives with an unmapped schema that threatens established tables.

![Beyond the Persona: Mastering Agent Skills and Commands](https://www.ozkary.dev/assets/2026/ozkary-beyond-the-persona-master-skills-and-commands.jpg "Beyond the Persona: Mastering Agent Skills and Commands")


In this practical, pattern-driven session, we will take a monolithic data agent and refactor it into an enterprise-grade modular system:

- **Commands** orchestrate predictable ingestion steps end-to-end without wasting LLM tokens.
- **Skills** step in dynamically to infer unknown schemas, evaluate breaking drift, and draft structured contracts.
- **Hooks & Guardrails** gate sensitive mutations—enforcing human sign-off before raw data reaches staging buckets or analytical tables, and remembering the approved schema so future batches run at wire speed.

Whether you are an aspiring engineer curious about production AI or a seasoned developer scaling data infrastructure, you'll walk away with an architectural blueprint to build agents that are maintainable, auditable, and production-ready.

## Agenda

- The Monolith Agent — The Real-World Ingestion Problem
- Demystifying Agent Skills — Teaching Domain Judgment (What It Knows)
- Demystifying Agent Commands — Deterministic Execution (What It Does)
- Managing Schema Drift — When Skills and Commands Collaborate
- Live Demonstration — From Schema Drift to Data Warehouse Provisioning (GitHub Repo)
- Key Takeaways & The Road Ahead


## Why Attend?

If you are an engineer or a developer who knows data pipelines but is struggling with how to use AI in production without breaking things, this session is for you. How do you handle a change in data format without crashing the job? How do you know the AI isn't hallucinating columns that don't exist?

- The Real Fix for Brittle Agents: Most AI data agents are fragile prototypes. We will show you how to move to a system that handles schema drift and strange data payloads automatically.

- Save Token Cost for Judgment: Known data should process instantly for free. We will show you the pattern that reserves the expensive LLM token burn only for reasoning when an actual drift occurs.

- Secure Human Sign-Off: Never allow an AI to change your BigQuery or Snowflake tables automatically. Learn how to create explicit guardrails that display an AI-proposed schema change and force a human to click "Approve" before any code runs.

You’ll walk away from this practical session not just with an understanding of a new architecture, but with a clear pattern you can start using next week to build reliable, auditable, and production-ready data agents.  

## Live YouTube Event

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; margin-bottom: 25px; background: #000;">
<iframe 
src="https://www.youtube.com/embed/o_En8fzuUvo" 
title="Live YouTube event" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
allowfullscreen>
</iframe>
</div>

## Stay Updated on Future Events

<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 15px;">
    <script async data-uid="151cd819b7" src="https://ozkary.kit.com/151cd819b7/index.js"></script>      
</div>


