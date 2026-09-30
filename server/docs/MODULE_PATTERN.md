# Server Module Pattern (Canonical)

## Reference Implementations

All new backend module work should align with these domain implementations:

- `server/src/accounts/*`
- `server/src/players/*`
- `server/src/combat/*`

Use these three as the source of truth for naming, layering, and composition.

## Layered Flow

```text
Router -> Controller -> Service -> Adapter -> Mapper -> Repository -> Prisma
```

Guidelines:

- Routers wire dependencies and route handlers.
- Controllers handle HTTP input/output and call `next(err)` on failures.
- Services contain domain rules and orchestration.
- Adapters compose transformation logic across entities.
- Mappers only transform data shapes.
- Repositories own all Prisma access.

## Folder Shape

A module should mirror this shape when applicable:

```text
{domain}/
  adapters/
  assemblers/
  controllers/
  domain/
  dto/
  mappers/
  middleware/
  repositories/
  routers/
  services/
  README.md
```

## Naming Conventions

- Files: PascalCase, for example `PlayerCreationService.ts`.
- Router factories: `create{Domain}Router()` returning Express `Router`.
- Keep domain-specific files inside the domain folder; avoid top-level duplicates.

## Testing Layout

Tests live under `server/test/*` and mirror `server/src/*`:

```text
server/src/players/controllers/PlayerSelectionController.ts
server/test/players/controllers/PlayerSelectionController.test.ts
```

## Migration Rule

Modules using earlier patterns (legacy `server/src/modules/*`, top-level duplicated repositories/services/mappers, or mixed naming) should be removed and replaced with fresh code following this pattern.

For `combat`, treat current domain boundaries and naming conventions as canonical; do not propagate stale legacy internals into new modules.

