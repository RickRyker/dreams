# Dialog Module

The Dialog module provides:

- Dialog definitions (Dialog, Page, Part, Action, Link, Condition)
- Hydration of full dialog graphs
- Quest‑aware execution engine
- Editor‑safe mutation with `editorId` authorization
- Repository, Service, Controller, Router layers

---

## 🧩 Architecture Overview

```mermaid
flowchart TD

  subgraph DialogModule
    subgraph RouterLayer
      DR["createDialogRouter()"]
    end

    subgraph ControllerLayer
      DC["DialogController"]
    end

    subgraph ServiceLayer
      DS["DialogService"]
    end

    subgraph AdapterLayer
      DA["DialogAdapter"]
    end

    subgraph MapperLayer
      DM["DialogMapper"]
    end

    subgraph RepoLayer
      DRepo["DialogRepository"]
    end

    subgraph InfraLayer
      Prisma["Prisma Client"]
      Perms["PermissionService (roles/ownership)"]
    end
  end

  DR --> DC
  DC --> DS
  DS --> DRepo
  DS --> Perms
  DRepo --> Prisma
  DS --> DA
  DA --> DM
```

---

## 🔄 Dialog Hydration Flow

```mermaid
flowchart TD

  UI["UI: Request dialog by id"] --> API["DialogRouter GET /dialogs/:dialogId"]
  API --> CTRL["DialogController.getDialog"]
  CTRL --> SVC["DialogService.getDialog"]
  SVC --> REPO["DialogRepository.getDialog (Prisma)"]

  REPO --> DB["DB: dialog + pages + parts + actions + links + conditions"]

  DB --> REPO
  REPO --> SVC
  SVC --> ADAPTER["DialogAdapter.toFullDialogDto"]
  ADAPTER --> DTO["Hydrated Dialog DTO"]
  DTO --> CTRL
  CTRL --> API
  API --> UI["UI: Render dialog tree"]
```

---

## 🛠 Dialog API Routes

```mermaid
flowchart TD

  subgraph DialogRouter["Dialog Router (/dialogs)"]
    direction TB
    R_get["GET /:dialogId"]
    R_list["GET /"]
    R_create["POST /"]
    R_update["PUT /:dialogId"]
    R_delete["DELETE /:dialogId"]
  end

  subgraph DialogController
    C_get
    C_list
    C_create
    C_update
    C_delete
  end

  subgraph DialogService
    S_get["getDialog"]
    S_list["listDialogs"]
    S_create["createDialog (editorId)"]
    S_update["updateDialog (editorId)"]
    S_delete["deleteDialog (editorId)"]
  end

  subgraph DialogRepository
    DB_get["getDialog"]
    DB_list["listDialogs"]
    DB_create["createDialog"]
    DB_update["updateDialog"]
    DB_delete["deleteDialog"]
  end

  R_get --> C_get --> S_get --> DB_get
  R_list --> C_list --> S_list --> DB_list
  R_create --> C_create --> S_create --> DB_create
  R_update --> C_update --> S_update --> DB_update
  R_delete --> C_delete --> S_delete --> DB_delete
```

---

## ⚔️ Quest‑Aware Execution Flow

```mermaid
flowchart TD

  Start["Start Execution"] --> LoadCtx["Load ExecutionContext"]
  LoadCtx --> LoadPage["Load Page(sequence)"]

  LoadPage --> EvalParts["Evaluate Part Conditions"]
  EvalParts --> VisibleParts["Visible Parts"]

  LoadPage --> EvalActions["Evaluate Action Conditions"]
  EvalActions --> ExecActions["Execute Actions (quest vars, items, movement)"]

  LoadPage --> EvalLinks["Evaluate Link Conditions"]
  EvalLinks --> VisibleLinks["Visible Links"]

  ExecActions --> VisibleLinks
  VisibleParts --> Output["Return { parts, links }"]
  VisibleLinks --> Output```

