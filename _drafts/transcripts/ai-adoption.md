AI adoption: how to get AI to write production code across multiple layers (DB, API, Frontend) without breaking existing systems or requiring a human to manually copy-paste errors back and forth in a chat window.

```text
The Updated Multi-Tier Architecture with Discovery & HITL
                      ┌───────────────────────────────┐
                      │    Human / Staff Architect   │
                      └──────────────┬────────────────┘
                                     │ 1. Raw Business Intent ("New vibration sensor data drop")
                                     ▼
                      ┌───────────────────────────────┐
                      │    Discovery Agent (ADK)      │◀───┐ (Iterative Domain Probing)
                      │  (AIStorming & Schema Probe)  │────┘
                      └──────────────┬────────────────┘
                                     │ 2. Drafts Contract (OpenSpec / BigQuery DDL / Bucket Plan)
                                     ▼
                      ┌───────────────────────────────┐
                      │  🛑 HITL Approval Gate        │
                      │  (ADK require_confirmation)   │ ───▶ [ Human Approves / Rejects ]
                      └──────────────┬────────────────┘
                                     │ 3. Approved Spec Delta committed to Git
                                     ▼
                      ┌───────────────────────────────┐
                      │    Antigravity Orchestrator   │
                      └──────────────┬────────────────┘
                                     │ (Dispatches sharded A2A tasks)
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
 ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
 │ Sub-Agent: Infra  │     │ Sub-Agent: Ingest │     │ Sub-Agent: UI/App │
 ├───────────────────┤     ├───────────────────┤     ├───────────────────┤
 │ • GCS Bucket      │     │ • Storage Trigger │     │ • React Dashboard │
 │ • BigQuery DDL    │     │ • Cloud Function  │     │ • Anomaly Chart   │
 └─────────┬─────────┘     └─────────┬─────────┘     └─────────┬─────────┘
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                      ┌───────────────────────────────┐
                      │  Deterministic Verification   │
                      │  (Emulators & Schema Linter)  │
                      └───────────────────────────────┘

```

1. The Discovery Agent (Domain Probing & Spec Synthesis)Before any infrastructure is provisioned or code is generated, the Discovery Agent acts as an engineering thought partner:Sample Payload Probing: Connects to an MCP data source or inspects raw Parquet/JSON sample files from the factory floor.Edge Case & Type Discovery: Infers field constraints, sampling rates (e.g., 1000 Hz vs. 10 Hz), and nullability rules.Contract Drafting: Generates the unified OpenSpec Delta (telemetry-spec.yaml), establishing the exact field names (sensor_vibration_hz, peak_amplitude), BigQuery partition strategy (_PARTITIONDATE), GCS naming format, and UI contract.

2. The Human-in-the-Loop (HITL) GateThe transition from discovery to code generation is a hard governance boundary.ADK Session Suspension (require_confirmation=True): In the Google ADK runtime, the Discovery Agent calls an approval tool that suspends the execution thread cleanly in SessionService.Architect Review: The principal engineer reviews the proposed architectural contract in the terminal or IDE:YAML[PROPOSED SPEC DELTA: telemetry-vibration-v1]
- GCS Bucket: gs://telemetry-raw-vibration
- Trigger: google.cloud.storage.object.v1.finalized
- BigQuery Table: `manufacturing_plant.vibration_telemetry_ext`
- Partition: _PARTITIONDATE
- UI Component: RealtimeVibrationChart (React / Recharts)
Approve generation loop? [y/N]: 

Resume Execution: Once approved, the orchestrator commits the spec delta to Git and triggers the sharded downstream code generation agents (Infra, Ingest, UI).Updated Presentation FlowSlide / SectionFocusRole in the Manufacturing Demo1. The Discovery PhaseDomain Mapping & AIStormingDiscovery Agent inspects the incoming sensor payload and proposes the multi-tier contract.2. HITL Governance GateADK State SuspensionShow how require_confirmation halts execution for human sign-off on the spec before generating code.3. Sharded Code GenContext Sharding & A2AInfra, Ingestion, and UI sub-agents build their respective components in parallel against the approved contract.4. Multi-Surface QASelf-Correcting ExecutionLocal emulators verify trigger and BigQuery external table schemas before presenting the finished PR.