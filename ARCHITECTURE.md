# TypeScript Monorepo Architecture

This repo is a multi-package TypeScript monorepo with shared types, a server workspace, a client workspace, and infrastructure (CDK).

## Project layout

- `shared/` — shared DTOs, schemas, types
- `server/` — server (Node, HTTP, game server, etc.)
- `client/` — React + Vite admin/game UI
- `infrastructure/` — AWS CDK app (stacks, pipelines, infra)

## TypeScript config overview

### Root

- `tsconfig.base.json`  
  Shared compiler options (strict, ES target, module, etc.).

- `tsconfig.json`  
  Project reference root only:

  ```json
  {
    "files": [],
    "references": [
      { "path": "./client" },
      { "path": "./infrastructure" },
      { "path": "./server" },
      { "path": "./shared" }
    ]
  }
