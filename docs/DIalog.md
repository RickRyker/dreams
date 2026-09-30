# Dialog Module
Comprehensive documentation for the MMORPG Dialog system

## Overview

The Dialog Module provides a fully data‑driven, extensible system for interactive NPC dialogs, branching narrative, conditional logic, chatbot‑enhanced conversations, and map‑triggered events. It is designed for MMORPG‑scale performance and supports both editor‑driven authoring and runtime evaluation.

The system is composed of:

- Dialog — the root entity representing a conversation tree
- DialogPage — a single screen or step in the dialog
- DialogPart — text, images, or UI elements displayed on a page
- DialogLink — navigational links to other pages
- DialogCondition — logic gates controlling visibility and flow
- DialogAction — side effects executed when a page or link is activated
- ChatBot / ChatBotResponse — optional AI‑driven conversational mode

All components are stored in the database and validated at runtime using Zod schemas.

---

## Data model summary

### Dialog

Represents a complete dialog tree.

Key fields:

- id
- name
- startPageId
- displayMode (bubble, full‑screen, chatbot)
- createdAt
- updatedAt

### DialogPage

A single step in the dialog.

Key fields:

- id
- dialogId
- title
- order
- parts[]
- links[]
- conditions[]
- actions[]

### DialogPart

A visual or textual element displayed on a page.

Examples:

- Text block
- Image
- NPC portrait
- Player name interpolation

### DialogLink

A navigational option leading to another page.

Fields:

- id
- pageId
- targetPageId
- label
- conditions[]
- actions[]

### DialogCondition

Controls visibility and flow.

Operators:

- EQ
- NE
- GT
- LT
- GTE
- LTE
- HAS_ITEM
- QUEST_STARTED
- QUEST_COMPLETED
- VARIABLE_MATCH
- CUSTOM_SCRIPT

### DialogAction

Side effects executed when a page or link is activated.

Examples:

- Give item
- Start quest
- Update quest variable
- Play sound
- Trigger map event
- Modify player stats
- Run custom script

---

## Runtime engine

The runtime engine performs:

### 1. Page resolution

- Loads the dialog
- Loads the target page
- Evaluates page‑level conditions
- Filters out hidden parts and links

### 2. Condition evaluation

Each condition is evaluated against:

- Player state
- Quest state
- Inventory
- Variables
- Custom logic

### 3. Action execution

Actions run when:

- A page is entered
- A link is clicked

Actions may:

- Modify player state
- Trigger events
- Update variables
- Log analytics

### 4. ChatBot mode

If `displayMode = CHATBOT`, the dialog:

- Displays a text input
- Routes user messages to a ChatBot
- Matches patterns in ChatBotResponse
- Returns dynamic replies

---

## Editor architecture

The Dialog Editor includes:

### Left navigation tabs

- Parts — manage text, images, UI blocks
- Actions — manage side effects
- Links — manage navigation
- Conditions — manage logic gates

### Debugger

A step‑through debugger that shows:

- Condition evaluation results
- Action execution logs
- Link visibility
- Page resolution trace

### Preview renderer

Renders the dialog exactly as the player sees it.

---

## Shared types and validation

All dialog types are exported from:

```ts
import { /* types */ } from "@shared/mappers";
```

Including:
- DialogDisplayMode
- DialogActionType
- DialogConditionOperator
- DialogPageSchema (Zod)
- DialogSchema
- Debug types for the debugger

Validation is performed using Zod schemas generated automatically from Prisma models.

## Code generation pipeline
The Dialog module participates in the shared codegen system:

- Prisma → TypeScript models
- Prisma → Zod schemas
- Zod → runtime validators
- Prisma → OpenAPI types
- Prisma → GraphQL SDL
- Auto‑generated shared/generated/index.ts
- Auto‑generated shared/index.ts

This ensures:
- Zero drift
- Type‑safe client/server integration
- Consistent validation

## Example flow
Player triggers a map event
Map event opens a dialog
Dialog engine loads the start page
Conditions hide or show parts and links
Player selects a link
Actions execute
Next page loads
Loop until dialog ends

## Future extensions
- Localization support
- Branch analytics
- Dialog versioning
- AI‑generated dialog suggestions
- Condition groups (AND/OR trees)
- Scriptable actions
