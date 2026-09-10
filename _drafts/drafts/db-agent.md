# Agentic MDM Architecture Aligned to the Medallion Model  
*(Vertex AI + BigQuery + Data Lake)*

## Medallion Overview

| Layer   | Storage Core        | BigQuery Role                          | Agent Focus                                  |
|--------|----------------------|----------------------------------------|----------------------------------------------|
| **Bronze** | GCS `landing/`       | `raw_*` external/ingested tables       | Ingestion, schema inference, basic QC        |
| **Silver** | GCS `standardized/`  | `stg_*` conformed domain tables        | Normalization, matching prep, DQ checks      |
| **Gold**   | GCS `snapshots/`     | `mdm_*`, `ref_*`, serving views        | Matching, survivorship, enrichment, serving  |

---

# Bronze Layer  
### *Capture everything, change nothing*

### Purpose  
Preserve raw fidelity and create the first point of observability.

### Data Lake  
- `gcs://bronze/<source>/...`  
- Raw CRM, ERP, partner, and event files.

### BigQuery  
- External or lightly ingested tables:  
  - `raw_crm_customer`  
  - `raw_partner_vehicle`  

### Vertex AI Agents  
#### **Bronze Ingestion Agent**
- Validates file structure and schema sanity.  
- Classifies source type (CRM, partner, batch/event).  
- Logs anomalies to `mdm_bronze_anomalies`.  
- Registers metadata for lineage.

**Bronze = forensic truth. Agents observe, not mutate.**

---

# Silver Layer  
### *Standardize, conform, and prepare for MDM*

### Purpose  
Turn heterogeneous raw data into consistent, domain-aligned structures.

### Data Lake  
- `gcs://silver/<domain>/...`  
- Canonicalized JSON/Parquet with consistent naming and typing.

### BigQuery  
- `stg_*` domain tables:  
  - `stg_customer`  
  - `stg_vehicle`  
  - `stg_account`  
- Match feature tables:  
  - `stg_customer_match_features`  
  - `stg_vehicle_match_features`  
- Data quality tables:  
  - `mdm_data_quality_issues`

### Vertex AI Agents  
#### **Normalization Agent**
- Applies mapping rules from `ref_source_field_mapping`.  
- Converts source-specific fields → canonical fields.  
- Harmonizes units, enums, formats.

#### **Silver Quality Agent**
- Runs DQ checks (nulls, ranges, referential integrity).  
- Writes issues + quality scores.

#### **Matching Prep Agent**
- Builds embeddings, phonetic keys, and similarity features.  
- Prepares data for MDM matching.

**Silver = clean, comparable, match-ready data.**

---

# Gold Layer  
### *Golden records, governance, and serving*

### Purpose  
Produce the authoritative truth and operationalize it across the enterprise.

### Data Lake  
- `gcs://gold/<domain>/snapshots/`  
- Versioned golden record exports for audit and rollback.

### BigQuery  
#### Core MDM Tables  
- `mdm_customer`  
- `mdm_vehicle`  
- `mdm_customer_source_link`  
- `mdm_match_group`

#### Governance & Config  
- `ref_survivorship_rules`  
- `ref_matching_thresholds`  
- `ref_enrichment_cache`  
- `mdm_lineage`  
- `mdm_job_runs`

#### Serving Views  
- `vw_crm_customer_master`  
- `vw_marketing_customer_segment`  
- `vw_ops_vehicle_master`

### Vertex AI Agents  
#### **Matching & Survivorship Agent**
- Uses BigQuery SQL + BQ ML + embeddings to group duplicates.  
- Applies survivorship rules from `ref_survivorship_rules`.  
- Writes golden records + crosswalks.

#### **Gold Quality & Governance Agent**
- Ensures policy compliance (PII, domain constraints).  
- Maintains lineage and job run metadata.

#### **Enrichment Agent**
- Calls external APIs (address validation, geo, segmentation).  
- Caches results in `ref_enrichment_cache`.

#### **Distribution Agent**
- Publishes mastered data to:  
  - CRM (reverse ETL)  
  - Pub/Sub events  
  - GCS exports (e.g., mailer lists)  
- Maintains SLA-aware jobs (e.g., Tuesday 10 AM mailer cut).

**Gold = the agentic MDM brain.**

---

# End-to-End Agentic Flow (Customer Example)

## 1. Bronze  
- CRM dump → `gcs://bronze/crm/customers_*.json`  
- Bronze Ingestion Agent:  
  - Registers file  
  - Validates schema  
  - Exposes as `raw_crm_customer`

## 2. Silver  
- Normalization Agent:  
  - `raw_crm_customer` → `stg_customer`  
- Silver Quality Agent:  
  - Runs DQ checks, flags issues  
- Matching Prep Agent:  
  - Builds `stg_customer_match_features`

## 3. Gold  
- Matching & Survivorship Agent:  
  - Produces `mdm_customer`, `mdm_customer_source_link`, `mdm_match_group`  
- Enrichment Agent:  
  - Adds segmentation, risk, geo, etc.  
- Distribution Agent:  
  - Publishes `vw_crm_customer_master`  
  - Exports to GCS  
  - Emits Pub/Sub events  

---

# Why This Fits Your Experience  
- Mirrors your **Bronze/Silver/Gold contracts**.  
- Rules, mappings, thresholds live as **data**, not code.  
- Bronze gives **history**, Silver gives **consistency**, Gold gives **governed truth**.  
- Vertex AI agents become **first-class operators** at each medallion boundary.  
- BigQuery becomes the **semantic + rules engine** for MDM.  
- GCS provides **auditability and lineage**.

# Example:

## How the agent knows what to do
This is where your MDM + medallion + agentic design really shines.

The agent should not hard‑code logic.
Instead, it reads configuration-as-data from BigQuery.

The agent consults three key tables:
1. ref_source_registry
Defines each source system and its ingestion rules.

source_id	source_name	file_pattern	domain	schema_version	ingestion_type
crm	CRM	crm_*.json	customer	v3	json
partner_x	Partner X	px_*.csv.gz	vehicle	v1	csv
2. ref_schema_definitions
Defines expected fields, types, and constraints.

3. ref_ingestion_rules
Defines what to do when a file arrives:

create external table

load into raw_*

validate schema

run DQ checks

escalate anomalies

This is how the agent “knows” what to do without being rewritten.
create external table

- load into raw_*
- validate schema
- run DQ checks
- escalate anomalies

This is how the agent “knows” what to do without being rewritten.