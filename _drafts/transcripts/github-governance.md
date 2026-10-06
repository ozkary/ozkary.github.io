# Final Version

This is a sophisticated "Separation of Concerns" architecture. You are effectively implementing a Controller-View-Service-Core pattern.

Here is the precise configuration for your .github folder to enforce this workflow where index.ts acts as the brain (Controller) and index.tsx acts as the face (View).

# Global Guardrails
File: .github/copilot-instructions.md Goal: Define the "Areas" and the "Controller Pattern" globally

## Repository Architecture & Standards

### Directory Structure
This project is strictly divided into four **Areas**:
- `src/apis`: Core network configuration and base clients.
- `src/services`: Business logic and cross-cutting concerns (Caching, Transformers).
- `src/containers`: Page-level orchestration.
- `src/components`: Reusable UI elements.

### Technology Stack
- **Language:** TypeScript (`.ts`, `.tsx`) exclusively.
- **Styling:** Tailwind CSS exclusively.
- **Components:** Functional Components with Arrow Functions.
- **State:** Use Hooks (`useState`, `useEffect`) only. Class components are forbidden.

### Naming Conventions
- **UI Feature Folders:** MUST be **PascalCase** (e.g., `src/containers/SalesDashboard/`).
- **Files:** MUST be **camelCase** (e.g., `cache.ts`, `userAuth.ts`, `apiClient.ts`).
- **Exceptions:**
  - Feature entry points must use `index.ts` (Controller) and `index.tsx` (View).
  - Classes and Interfaces must be **PascalCase**. 

### The View-Controller Pattern
Every feature in **containers** and **components** must use the **Folder-as-Namespace** pattern:
- **The View:** `src/{{area}}/{{featureName}}/index.tsx`
  - *Role:* Pure UI rendering.
  - *Rule:* Must act as a "Dumb Component."
- **The Controller:** `src/{{area}}/{{featureName}}/index.ts`
  - *Role:* Logic, State Management, and Service orchestration.
  - *Rule:* Acts as the "Brain" for the View. 

### Data Flow Hierarchy
- **Data Flow:**
  - **View** (`.tsx`) calls **Controller** (`.ts`).
  - **Controller** (`.ts`) calls **Services** (`src/services`).
  - **Services** (`src/services`) call **Core API** (`src/apis/index.ts`).

```
src/
├── apis/
│   └── index.ts          <-- Core Fetch Wrapper
├── services/
│   ├── cache.ts          <-- Cross-Cutting (camelCase)
│   └── user/
│       └── userAuth.ts   <-- Feature Service (camelCase)
└── containers/
    └── SalesDashboard/   <-- Feature Folder (PascalCase)
        ├── index.ts      <-- Controller (Logic)
        └── index.tsx     <-- View (UI)
```

# Modular Instructions (The Firewall)
We need two sets of instructions: one for the Views (to keep them dumb) and one for the Controllers (to guide them to Services).

- A. View Rules (The UI Guardrail)
File: .github/instructions/view-layer.md Target: Enforces that .tsx files are purely visual.

---
applyTo: "src/**/*.tsx"
---
## UI View Rules
You are working in a **View File** (`index.tsx`).

## Strict Constraints
1. **NO LOGIC:** Do not write complex state logic or data fetching here.
2. **NO EXTERNAL IMPORTS:** You are **forbidden** from importing directly from `src/services` or `src/apis`.
3. **CONTROLLER BINDING:** You must import your logic from the sibling `./index.ts` file.

## Expected Pattern
```javascript
import { use{{Feature}}Controller } from './index';

export const {{Feature}}View = () => {
  const { data, handleSave } = use{{Feature}}Controller();
  return <div onClick={handleSave}>{data}</div>;
};
```

- B. Controller Rules (The Logic Guardrail)
File: .github/instructions/controller-layer.md Target: Enforces that .ts files inside components/containers use Services, not direct APIs.

---
applyTo: ["src/components/**/index.ts", "src/containers/**/index.ts"]
---
## Controller Layer Rules
You are working in a **Controller File** (`index.ts`).

## Responsibilities
- **Bridge:** You bridge the gap between the UI and the Services.
- **State Management:** Handle `useState`, `useReducer`, or Context logic here.
- **Service Orchestration:** Import reusable methods from `src/services/`.
- **Data Sync:** Prepare data for the sibling `index.tsx` view.

## Constraints
- **NO DIRECT FETCH:** Do not use `fetch` or `axios` here.
- **USE SERVICES:** All external data must come through `src/services/{{domain}}/index.ts`.
- **EXPORTS:** You must export functions/data cleanly for the sibling `.tsx` file

# Prompt Library (The Scaffolder)
File: .github/prompts/new-module.md Goal: Automate the creation of the specific Controller/View pair.

# Create New Module
I need to generate a complete vertical slice for a new feature.
**Feature Name:** {{featureName}} (PascalCase, e.g., "SalesDashboard")

Please generate the code blocks for these 4 layers using our **Folder-as-Namespace** pattern. 
*Note: Logic folders must be camelCase. UI folders must be PascalCase.*

---

### API Layer
**File:** `src/apis/{{featureName (camelCase)}}/index.ts`
- **Role:** Define specific endpoints.
- **Code:** Import `coreClient` from `src/apis/index.ts`. Export async functions.

### Service Layer
**File:** `src/services/{{featureName (camelCase)}}/index.ts`
- **Role:** Business logic and data transformation.
- **Code:** Import the API from step 1. Export the service object/functions.

### Component Layer
**Folder:** `src/components/{{featureName}}/`
- **File:** `controller.ts` (Controller): Logic and State only.
- **File:** `index.tsx` (View): Pure UI. Imports Controller.

### Container Layer
**Folder:** `src/containers/{{featureName}}/`
- **File:** `controller.ts` (Controller): Imports `{{featureName}}` Service (from step 2) and Component (from step 3).
- **File:** `index.tsx` (View): The main Page assembly.

### **Style:** Use TypeScript interfaces for all Props.

# Custom AI Agent (The Reviewer)

File: .github/agents/code-auditor.md Goal: A bot that ensures the chain of command is respected.

---
name: Architecture Auditor
description: Verifies strict separation of Controller, Service, and View layers.
tools: [code-search]
---
## Role
You ensure the integrity of the data flow: View -> Controller -> Service -> API.

## Audit Logic
When asked to "Audit this feature":

1. **Check the View (.tsx):** - FAIL if it imports `src/services`.
   - FAIL if it imports `src/apis`.
   - PASS only if it imports `./index`.

2. **Check the Controller (.ts):**
   - FAIL if it uses `fetch` or `axios`.
   - PASS only if it delegates to `src/services`.

3. **Check the Service:**
   - FAIL if it defines its own URL logic.
   - PASS only if it imports `src/apis/index.ts`.


____

# 🤖 Copilot Developer Workflow

Welcome to the team! We use **GitHub Copilot** not just as a coding assistant, but as an **Architectural Enforcer**. This guide explains how to interact with our specific `.github` configuration to generate code that matches our **Vertical Slice** architecture.


## 1. Scaffolding a New Feature
Instead of manually creating folders, use our custom **Slash Command**. This ensures you get the full **Folder-as-Namespace** structure (API, Service, Component, Container) instantly.

### The Interaction
1. Open the **Copilot Chat** panel (`Ctrl+Cmd+I` or click the icon).
2. Type `/` to see the command list.
3. Select **`/new-module`** (or type it manually).
4. Provide the feature name in **PascalCase**.

**Command Template:**
```text
/new-module featureName:SalesDashboard

What Copilot Generates: It will stream 4 distinct code blocks. Click "Insert into New File" for each:
```
src/
├── apis/
│   └── salesDashboard/        (Endpoint definitions)
│       └── index.ts
│
├── services/
│   └── salesDashboard/        (Business logic & transformers)
│       └── index.ts
│
├── components/
│   └── SalesDashboard/        (Reusable UI: View + Controller)
│       ├── index.ts
│       └── index.tsx
│
└── containers/
    └── SalesDashboard/        (Page Assembly: View + Controller)
        ├── index.ts
        └── index.tsx
```

2. Coding: The "Ghost Text" Experience
Once your files are created, Copilot uses our Modular Instructions (.github/instructions/) to guide your keystrokes.

Scenario A: Working in the View (index.tsx)
If you try to add logic in the UI, Copilot will stop you.

You Type: `useEffect(() => { fetch`

Copilot Suggests: Nothing (or it might suggest importing a controller).

Correct Interaction: Start typing const { data } = use... and Copilot will autocomplete your custom Controller hook:

```TypeScript

// Copilot Auto-complete
const { salesData, isLoading } = useSalesDashboardController();
Scenario B: Working in the Controller (index.ts)
If you try to call an API directly, Copilot redirects you to the Service layer.
```
You Type: `const loadData = async () => {`

Copilot Suggests:

```TypeScript

// Copilot adheres to 'controller-layer.md' rules
const data = await salesDashboard.getSummary(); // Imports from src/services/salesDashboard
setSalesData(data);
```

3. Auditing & Refactoring
Use Copilot Chat to check if your code complies with our Hybrid Naming Convention (PascalCase for UI folders, camelCase for Logic folders).

The Interaction
Highlight a file or folder in your explorer and ask:

"Does this feature follow our Controller-View architecture?"

Copilot's Logic:

It reads .github/copilot-instructions.md.

It checks if src/containers/SalesDashboard exists (PascalCase).

It checks if src/services/salesDashboard exists (camelCase).

It verifies that index.tsx is importing from index.ts.

Expected Response:

"✅ The structure looks correct. The UI folder is PascalCase, and the Service folder is camelCase. The View is strictly presentational."

4. Troubleshooting
If Copilot ignores the architecture:

Check Context: Ensure the .github folder is pushed to the remote repository.

Restart: Reload your IDE window to force Copilot to re-index the instructions.

Be Explicit: Start your prompt with "According to project rules..." to force a lookup of copilot-instructions.md.


File layout:
```
.github/
├── copilot-instructions.md            (Global Constitution)
│   ├── Defines Hybrid Naming: PascalCase for UI folders, camelCase for Logic folders.
│   ├── Enforces Tech Stack: TypeScript, Tailwind, Functional Components.
│   └── Sets Data Flow: View → Controller → Service → Core API.
│
├── instructions/                      (Contextual Guardrails)
│   ├── view-layer.md
│   │   ├── Target: `**/*.tsx`
│   │   └── Rules: No logic, no direct service imports, must use Controller.
│   │
│   └── controller-layer.md
│       ├── Target: `**/index.ts`
│       └── Rules: No direct fetch calls, must import Services (camelCase).
│
├── prompts/                           (Slash Commands)
│   └── new-module.md
│       ├── Command: `/new-module featureName:SalesDashboard`
│       └── Action: Generates the full 4-layer Vertical Slice (API, Service, Component, Container).
│
└── agents/                            (Specialized Bots)
    └── arch-auditor.md
        ├── Role: Architecture Enforcer
        └── Action: Audits imports to ensure the Controller-View pattern is not violated.

root/
└── COPILOT_WORKFLOW.md                (Team Documentation)
    └── Guide: How to use `/new-module` and interact with the architecture.
```

| Standard Agent Component | The "GitHub Copilot" Equivalent |
| :--- | :--- |
| **System Prompt** | **`.github/copilot-instructions.md`**<br>This acts as the immutable "Constitution" for every interaction. It sets the baseline rules (Tech Stack, Naming) that are silently prepended to the context window. |
| **Context / RAG** | **`.github/instructions/*.md`**<br>These are "Contextual Injections." A standard agent might search a vector database for relevant info. Copilot simplifies this by checking: *"Is the user in `src/components`? If yes, inject `view-layer.md` into the System Prompt."* |
| **Tools / Functions** | **`.github/prompts/*.md`**<br>Your custom slash commands (e.g., `/new-module`) act like "Agent Tools." They are pre-packaged logic blocks that the user invokes to perform a specific, complex task. |
| **Human Prompt** | **The Chat Window**<br>What the developer actually types (e.g., *"Refactor this code"*). |
| **Persona** | **Hardcoded (mostly)**<br>This is the key difference. A custom agent can be told *"You are a Pirate."* Copilot is hardcoded to be a "Helpful Coding Assistant." However, your instructions *can* shift its tone (e.g., *"Be strict,"* *"Act as a Lead Architect"*). |