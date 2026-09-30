# Copilot Cloud Agent Onboarding (Dreams monorepo)

Use this file as the default source of truth for working in this repo. **Trust these instructions first, and only search when information here is missing or proven wrong.**

## 1) What this repository is

- Monorepo for **Dreams of Nowhere Else and Beyond** (MMORPG stack).
- Size (tracked files): **~1337 files**, primarily **TypeScript** (`.ts` dominates), plus Prisma schemas and React TSX.
- Runtime/tooling:
  - Node/NPM workspace monorepo (`npm@10.8.2` at root).
  - Server: Node + Express + Prisma + PostgreSQL/Neon adapters.
  - Client: React + Vite + Vitest.
  - Shared package: generated DTO/types used by server/client.
  - Infrastructure: AWS CDK (TypeScript).

## 2) Critical path and architecture

- Server entry source: `server/src/index.ts` -> `server/src/server/bootstrap.ts`.
- Client entry source: `client/src/main.tsx`.
- Prisma schema: `server/prisma/schema.prisma` (`provider = "postgresql"`).
- Shared codegen outputs: `shared/dto`, `shared/types`, `shared/index.ts`.
- Historical docs reference WAL/buffer concepts, but active persistence is Prisma/Postgres in `server/src/**`.

## 3) Repository layout you should know without searching

- Root: `package.json` (workspaces + orchestration scripts), `tsconfig.json` (project references), `.github/workflows/*.yml`, `qodana.yaml`.
- `server/`: API, Prisma config/schema/migrations, Jest tests under `server/test`.
- `client/`: React app, Vite/Vitest/ESLint config.
- `shared/`: shared TS types/DTOs consumed by other workspaces.
- `infrastructure/`: CDK app (`infrastructure/bin/app.ts`, `infrastructure/lib/*`).
- `tools/`: schema/codegen helper scripts (some currently misconfigured for ESM execution).
- `docs/`: gameplay and architecture documentation.

## 4) CI and validation pipelines (what PRs are checked against)

Workflows in `.github/workflows`:

1. `ci-build.yml` (push main + pull_request):  
   `npm install` -> `npx tsc -b` -> `npm run lint --if-present` -> `npm test --if-present`
2. `prisma-validate.yml` (PR path-filtered): runs in `server/` with Node 20, `npm install`, `npx prisma validate`, and `npx prisma migrate diff`.
3. `schema-diff.yml` (PR path-filtered): `npm install`, `npm run schema:diff`.
4. Deploy workflows (`deploy-*.yml`, `rollback.yml`) are manual (`workflow_dispatch`) and AWS-secret dependent.
5. `neon_workflow.yml`: PR open/sync/close Neon branch automation.

## 5) Command matrix (validated locally): what works vs fails

All commands below were executed from repo root unless noted.

| Purpose | Command | Result | Notes |
|---|---|---|---|
| Bootstrap | `npm install` | ✅ works (~5-21s) | Shows engine warnings (`EBADENGINE`) but completes. |
| Clean | `npm run clean` | ✅ works (~5s) | Removes workspace build outputs. |
| Build (app-only) | `npx tsc -b shared server client` | ✅ works (~2-3s in warm env) | Reliable for server/client changes. |
| Build (full CI style) | `npx tsc -b` | ❌ fails (~29s) | `infrastructure/bin/app.ts` shebang/BOM parse error (`TS18026`, `TS1005`). |
| Build (root script) | `npm run build` | ❌ fails (~20s) | Fails at `build:infra` with same infra parse error. |
| Lint (root script) | `npm run lint` | ❌ fails (<1s) | Server lint cannot find `eslint` binary in workspace. |
| Prisma generate | `npm run prisma:generate -w server` | ✅ works (~43s) | Runs prisma build/format/generate + zod/shared codegen. |
| Prisma CI helper | `npm run ci:prisma` | ❌ fails (~1-2s) | `schema:diff` uses `ts-node` with `.ts` ESM script; `ERR_UNKNOWN_FILE_EXTENSION`. Also references missing `server` script `prisma:validate`. |
| Server tests | `npm run test -w server -- --runInBand` | ❌ baseline red (~165s) | Many existing failing suites (not introduced by agent changes). |
| Client tests | `npm run test -w client -- --run` | ❌ fails (~2s) | No test files present. |
| Root tests | `npm test` | ❌ fails | No root `test` script. |
| Client dev run | `npm run dev -w client` | ✅ starts Vite (~0.4s) | Local URL `http://localhost:5173/`. |
| Server dev run (script) | `npm run dev -w server` | ❌ fails | Script currently malformed (`tsx ... watch ...` interpreted as module `watch`). |
| Server start (script) | `npm run start -w server` | ❌ fails | Points to non-existent `dist/http/server.js`. |

## 6) Reliable execution order for typical change validation

For most server/client code changes, use this order:

1. `npm install` (always do this first in fresh/clean environments).
2. `npx tsc -b shared server client`.
3. If Prisma/schema changed: `npm run prisma:generate -w server`.
4. If client changed: `npm run build -w client`.
5. If server changed: `npm run build -w server`.

Avoid using failing baseline scripts (`npm run build` at root, `npm run lint` at root, `npm test` at root) unless you are explicitly fixing those pipelines.

## 7) Environment requirements and preconditions

- Node version target from repo/workflows: **Node 20** (`server/.node-version` = `20`, workflows use node 20).
- Server runtime requires `DATABASE_URL` (`server/src/config/env.ts` hard-fails if missing).
- Client env files exist: `client/.env.development`, `.env.test`, `.env.prod`.
- Infrastructure/deploy commands require AWS credentials/secrets and are not local-default validation steps.

## 8) Known pitfalls that cause avoidable PR failures

- CI-style full TypeScript build is currently blocked by infrastructure shebang/BOM issue.
- Server lint script is currently broken due missing eslint binary in that workspace.
- Prisma helper scripts in root/tools have ESM/ts-node execution mismatch.
- Server `dev`/`start` scripts currently point to invalid entrypoint forms/paths.

## 9) High-value files for fast edits

- Root orchestration: `package.json`, `tsconfig.json`, `.github/workflows/ci-build.yml`.
- Server:
  - `server/package.json`
  - `server/src/index.ts`
  - `server/src/server/bootstrap.ts`
  - `server/src/config/env.ts`
  - `server/src/db/client.ts`
  - `server/prisma/schema.prisma`
  - `server/jest.config.cjs`
- Client:
  - `client/package.json`
  - `client/src/main.tsx`
  - `client/vite.config.ts`
  - `client/vitest.config.ts`
  - `client/eslint.config.js`

## 10) Root inventory (quick orientation)

Top-level entries: `.agents`, `.claude`, `.github`, `.idea`, `client`, `docs`, `infrastructure`, `server`, `shared`, `tools`, `.gitignore`, `AGENTS.md`, `ARCHITECTURE.md`, `COMBAT_ENGINE_REFACTOR.md`, `combat_engine_refactor_checklist.md`, `combat_engine_refactor_priority_list.md`, `combat_engine_refactor_roadmap.md`, `combat_engine_refactor_visual_architecture.txt`, `DIRECTORY_STRUCTURE.md`, `implementation-checklist.md`, `LICENSE`, `Makefile`, `MOCK_CHECKLIST.md`, `package.json`, `package-lock.json`, `project-reference-graph.txt`, `qodana.yaml`, `README.md`, `skills-lock.json`, `TSCONFIG-TREE.md`, `tsconfig.base.json`, `tsconfig.json`, `update_file_headers.ps1`.

No command timed out during validation (longest observed command was server tests at ~165s, which completed with failures rather than timeout).

# General Code Review Standards

## Purpose

These instructions guide Copilot code review across all files in this repository.
Language-specific rules are in separate instruction files.

## Security Critical Issues

- Check for hardcoded secrets, API keys, or credentials
- Look for SQL injection and XSS vulnerabilities
- Verify proper input validation and sanitization
- Review authentication and authorization logic

## Performance Red Flags

- Identify N+1 database query problems
- Spot inefficient loops and algorithmic issues
- Check for memory leaks and resource cleanup
- Review caching opportunities for expensive operations

## Code Quality Essentials

- Functions should be focused and appropriately sized (under 50 lines)
- Use clear, descriptive naming conventions
- Ensure proper error handling throughout
- Remove dead code and unused imports

## Review Style

- Be specific and actionable in feedback
- Explain the "why" behind recommendations
- Acknowledge good patterns when you see them
- Ask clarifying questions when code intent is unclear

## Testing Standards

- New features require unit tests
- Tests should cover edge cases and error conditions
- Test names should clearly describe what they test

Always prioritize security vulnerabilities and performance issues that could impact users.