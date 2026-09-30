# AI Agent Guide: MMORPG Engine "Dreams of Nowhere Else and Beyond"

## Architecture & Data Flow
High-concurrency engine historically documented with a **Write-Ahead Log (WAL)** / buffer-and-flush pattern, but the active codebase persists game state via Prisma directly in PostgreSQL. Consult `docs/ARCHITECTURE.md` for the original design notes and `server/src/engine` for current engine implementations.
- **Critical Flow:** Client Action -> buffered processing / batch flush (see docs). Current engine modules (e.g. `server/src/engine/WorldEngine.ts`) persist via Prisma rather than calling a `WALService.appendAction()` API.
- **Persistence:** Prisma ORM targeting PostgreSQL (Neon-compatible). See `server/prisma/schema.prisma` (datasource provider = `postgresql`) and `server/package.json` for Neon/Postgres adapters. S3 is used for assets and can be used for audit offload (AWS SDK present in `server/package.json`).
- **Maintenance:** Admins can toggle maintenance mode, preventing new logins while allowing existing sessions to finish (see `/world/maintenance` endpoint implemented under `server/src/modules/world`).
- **Moderation:** Admins can review audit data and take action (ban, shadow-ban, etc.). The shadow-ban behavior is described in the docs (requests appear successful to the caller but are not persisted/visible); the concrete moderation/offload service may live in `server/src/modules` or be implemented ad-hoc—search `docs/Moderation.md` and `server/src` for current hooks.

## Development Workflows
- **No Root Package:** Always `cd server/` or `cd client/` before running commands.
- **DB Schema:** After editing `prisma/schema.prisma`, run the repository script in `/server` to update the client: `npm run prisma:generate` (this runs the `prisma:build` step and `prisma generate`). See `server/package.json` for scripts.
- **Testing:**
  - server: Use Jest for unit tests. Run `npm test` in `/server`.
  - Frontend: Tests run via Vitest (project uses React Testing Library helpers). Run `npm test` in `/client` (runs `vitest`).
- **Logging:** Critical actions are recorded by application modules and persisted via Prisma. The AWS SDK is available (`@aws-sdk/client-s3` in `server/package.json`) for audit offload; a dedicated `AuditLogService` is not present as a single file in `server/src/services` — check `docs/` and `server/src` for current audit/offload hooks.
- **Environment:** Use `.env` files for configuration. Ensure `DATABASE_URL` is set for Prisma and AWS credentials for S3.
