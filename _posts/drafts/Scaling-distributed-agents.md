

## 📋 Meetup Event Description

### **Title:** Distributed AI Agents Architecture: LangGraph vs. Google ADK

**Sub-title:** Moving from single-app chains to enterprise, event-driven agent meshes.

- Instead of "Chains," they see Microservices.
- Instead of "Prompts," they see Input Payloads & API Specs.
- Instead of "Memory," they see Distributed State & Session Persistence.

### **About the Event:**

Building a proof-of-concept AI agent on your laptop is easy; scaling a network of autonomous agents across an enterprise platform is a completely different challenge.

Many developers default to building agents like classic, stateful web monoliths—where everything is tightly coupled within a single runtime. But as systems grow, enterprise architectures demand a shift toward protocol-first, distributed microservices where agents operate independently and communicate across distinct platform boundaries.

In this deep-dive technical session, we will break down the architectural paradigms of two powerhouse frameworks: **LangChain/LangGraph** and the **Google Agent Development Kit (ADK)**.

### **What We Will Cover:**

* **The Stateful Monolith:** How LangGraph manages intricate, prompt-level cyclical reasoning loops and application-level state checkpointers.
* **The Distributed Agent Mesh:** How Google ADK uses an event-driven, protocol-first approach to build cross-language (polyglot) microservices using Agent-to-Agent (A2A) networks.
* **Human-in-the-Loop (HITL) Comparison:** App-level state pausing vs. cloud-managed infrastructure-level session suspension.
* **The Production Decision Matrix:** Concrete, real-world design scenarios to help you confidently choose the right tool for your engineering stack.

Whether you are an enterprise data architect, cloud engineer, or a software developer looking to move beyond basic prompt engineering into advanced system design, this session will give you the blueprints needed for production-grade AI deployment.

---

## 🛠️ Key Visuals to Draw on the Board / Slides

If you are doing live technical whiteboard architecture during the session, these two clean conceptual comparisons will lock in the intuition for your audience:

1. **The LangGraph Side:** Draw a single unified application container box. Inside it, draw nodes and cyclical arrows (Node A $\rightarrow$ Node B $\rightarrow$ Node A) passing a shared state object, backed by a coupled database icon. *Label it: "In-Memory/Request-Coupled Monolith".*
2. **The Google ADK Side:** Draw three separate, decoupled container boxes representing individual microservices (e.g., Python Agent, Go Agent, Java Agent). Connect them via an asynchronous event broker bus or network protocol arrows using shared Session Artifacts. *Label it: "Event-Driven Network/Distributed Mesh".*

### JOB POST:

Agentic AI & Protocols

Deep, practical experience with:
MCP (Model Context Protocol) — tools, capabilities, memory, session orchestration, security
Google ADK Agentic Protocols — agents, workflows, context management
LangChain & LangGraph — LCEL chains, agents, tools, memory, retrievers, stateful graph orchestration, checkpointing, human-in-the-loop control, and LangSmith tracing and evaluation
Agent harness engineering — agent execution loops, tool-call orchestration, context and prompt assembly, sub-agent delegation, streaming, token-budget management, and hook and guardrail enforcement
Spec-Driven & Agentic Development Frameworks

Hands-on experience with spec-driven development (SDD) workflows and tooling, including GitHub Spec-Kit (specify, plan, tasks, implement), OpenSpec (change proposals and living specifications), and BMAD-METHOD (agentic planning with specialized agent roles)
Proven ability to decompose product intent into executable specifications, structured plans, and agent-ready task breakdowns that align human and AI contributors before code is written
Familiarity with greenfield and brownfield delivery driven by multi-agent planning, context engineering, and specification-first review gates
Databases & Agent Memory Stores

Hands‑on experience with AlloyDB, including:
Vector indexing / pgvector
AI inference acceleration and Vertex AI integration
Building agent memory and retrieval layers
Transactional context management for Agentic systems
Strong PostgreSQL/Postgres RDS fundamentals, including:
Schema design for knowledge retrieval
Query optimization
Hybrid search patterns
Durable storage for AI session and memory state
Cloud & Platform Skills

Experience with:
Vertex AI (Model Garden, Embeddings, Vector Search, Generative AI APIs)
GCP Cloud Run, AlloyDB, Cloud Storage, Secret Manager
Terraform / IaC
CI/CD automation, containerization, environment provisioning
OAuth, SSO, IAM roles/policies, service account management
Additional

Experience with AI coding tools (Claude Code, GitHub Copilot, AWS Kiro).
Strong understanding of LLM safety, governance, context window management, and prompt engineering.

---

## Job Post Coverage Map

```
                  JOB POST REQUIREMENTS COVERAGE
 ┌──────────────────────────────────────────────────────────────┐
 │ [X] LangChain & LangGraph (LCEL, Chains, Checkpointing, HITL) │
 │ [X] Google ADK & Protocols (Workflows, Context, A2A, MCP)    │
 │ [X] Agent Harness Engineering & Execution Loops              │
 │ [X] Cloud Platform Architecture & Event-Driven Systems       │
 └──────────────────────────────────────────────────────────────┘

```

### 1. Agentic AI & Orchestration Protocols (Core Theme)

* **Job Requirement:** Deep experience with **LangChain/LangGraph** (LCEL, stateful graphs, checkpointing, Human-in-the-Loop) and **Google ADK Protocols** (agents, workflows, A2A, MCP).
* **Covered in Presentation:**
* **LangGraph:** Explains in-memory state graphs, explicit checkpointing, and application-level HITL thread interrupts.
* **Google ADK:** Explains protocol-first microservices, A2A messaging, session-level state suspension, and the stateless MCP updates.
* **The Direct Comparison:** Side-by-side contrast of request-coupled chains versus event-driven agent meshes.



### 2. Agent Harness & Runtime Engineering

* **Job Requirement:** Agent execution loops, context assembly, sub-agent delegation, and token-budget/state management.
* **Covered in Presentation:**
* Demonstrates how LangGraph manages execution loops via graph nodes versus how ADK delegates tasks via hierarchical router nodes and remote network agents.
* Details data payload exchange: passing state dictionaries versus registering decoupling artifacts and cloud storage pointers.



### 3. Cloud & Platform Architecture (GCP Alignment)

* **Job Requirement:** Enterprise cloud deployment, Cloud Run, serverless execution, and multi-service orchestration.
* **Covered in Presentation:**
* Contrasts single-runtime application deployment against distributed, polyglot microservices (e.g., Python, Go, Java) running on Cloud Run or GKE.
* Highlights OpenTelemetry instrumentation, cloud tracing, and infrastructure-level scaling.



---

## What to Touch On (Secondary Areas)

While the presentation focuses heavily on **Agent Architecture & Protocols**, you can briefly connect the dots to two other requirements in the posting during the Q&A or transition slides:

* **Databases & Vector Memory (AlloyDB / pgvector):** Frame how state persistence differs between the two paradigms—LangGraph writing state directly to Postgres/AlloyDB checkpointers versus ADK using AlloyDB for durable long-term memory services and session stores.
* **Spec-Driven Development (SDD):** Highlight how specifying agent interactions, schemas, and A2A contracts upfront aligns directly with Spec-Driven workflows (e.g., OpenSpec or GitHub Spec-Kit) before writing implementation code.