# 🌳 Monorepo TypeScript Configuration Tree
### TS6+ / TS7‑Ready Architecture

This document describes the full TypeScript configuration structure for the monorepo, including project references, build boundaries, and how each workspace participates in the compilation graph.

---

# 🧱 Root Configuration

```
tsconfig.base.json
```

**Purpose:**  
Global compiler settings inherited by all workspaces.

**Contains:**
- target, module, moduleResolution
- strictness rules
- skipLibCheck
- esModuleInterop
- noEmit defaults
- shared TS6+ settings

---

# 📦 Shared Workspace

```
shared/
  tsconfig.json
  src/
```

**Purpose:**  
A composite TypeScript library consumed by all other workspaces.

**Key properties:**
- `"composite": true`
- No emit settings overridden
- Exported via project references

---

# 🎨 Frontend Workspace

```
client/
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  tsconfig.vitest.json
  vite.config.ts
  vitest.config.ts
  src/
```

### `tsconfig.json`
Project reference root.  
References:
- `tsconfig.app.json`
- `tsconfig.node.json`
- `../shared`

### `tsconfig.app.json`
React + Vite application build.
- `"moduleResolution": "bundler"`
- `"jsx": "react-jsx"`
- `"paths": { "@shared/*": ["../shared/*"] }`
- `"noEmit": true`

### `tsconfig.node.json`
Vite config + tooling.  
Includes:
- `vite.config.ts`
- `vitest.config.ts`

References:
- `../shared`

### `tsconfig.vitest.json`
Isolated Vitest typechecking config.  
Not part of project references.

---

# ⚙️ Server Workspace

```
server/
  tsconfig.json
  tsconfig.paths.json
  tsconfig.node.json
  tsconfig.jest.json
  jest.config.cjs
  src/
```

### `tsconfig.json`
Project reference root.  
References:
- `../shared`

### `tsconfig.paths.json`
Defines server path aliases:
- `@auth/*`
- `@core/*`
- `@email/*`
- `@prisma`
- `@shared/*`

### `tsconfig.node.json`
Actual server build config.
- `"outDir": "dist"`
- `"moduleResolution": "bundler"`
- `"resolveJsonModule": true`
- `"isolatedModules": true`
- `"verbatimModuleSyntax": true`
- `"moduleDetection": "force"`

References:
- `../shared`

### `tsconfig.jest.json`
Typechecking for test files (`*.test.ts`).  
Extends `tsconfig.paths.json`.

### `jest.config.cjs`
Jest runtime config (CommonJS).  
Not typechecked by TypeScript.

---

# 🏗️ Infrastructure Workspace

```
infrastructure/
  tsconfig.json
  bin/
  stacks/
```

### `tsconfig.json`
Modern TS6+ + CDK v2 config.
- `"composite": true`
- `"outDir": "dist"`
- `"moduleResolution": "bundler"`
- `"paths": { "@shared/*": ["../shared/*"] }`

References:
- `../shared`

---

# 🔗 Project Reference Graph

```
shared
  ▲
  │
  ├── client/tsconfig.json
  │       ├── tsconfig.app.json
  │       └── tsconfig.node.json
  │
  ├── server/tsconfig.json
  │       ├── tsconfig.node.json
  │       └── tsconfig.jest.json
  │
  └── infrastructure/tsconfig.json
```

---

# 🧭 Build Order (tsc -b)

1. `shared`
2. `client` (app + node)
3. `server`
4. `infrastructure`

---

# 🏁 Summary

This monorepo uses a clean, modern TS6+/TS7 project‑reference architecture:

- **shared** is the foundational library
- **client**, **server**, and **infrastructure** all reference it
- Each workspace has a dedicated build config
- Tooling configs (Vite, Vitest, Jest) are isolated
- No deprecated TS options
- Fully compatible with Node 20, Vite, Vitest, Jest, CDK v2, and Prisma
