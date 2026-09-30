# Module Refactoring Guide

## Scope

This guide defines the target architecture for server module rewrites.

Canonical targets:

- `server/src/accounts/*`
- `server/src/players/*`
- `server/src/combat/*`

Use `server/docs/MODULE_PATTERN.md` as the normative reference.

## What To Replace

Replace earlier patterns, including:

- Legacy domain code under `server/src/modules/*`
- Duplicated top-level domain logic under `server/src/repositories/*`
- Duplicated top-level domain logic under `server/src/services/*`
- Duplicated top-level domain logic under `server/src/mappers/*`

## Target Design

```text
Router -> Controller -> Assembler -> Service -> Adapter -> Mapper -> Repository -> Prisma
```

Rules:

- Keep Prisma usage in repositories.
- Keep business rules in services.
- Keep transport concerns in routers/controllers.
- Keep DTO/model conversion in assemblers.
- Keep Prisma/model conversion in adapters/mappers.
- Use PascalCase file names for module-local classes.

## Required Directory Shape

```text
server/src/{domain}/
  adapters/
  controllers/
  assemblers/
  mappers/
  middleware/
  repositories/
  routers/
  services/
```

## Testing Rule

Tests must live in `server/test/*` and mirror `server/src/*` pathing.

Example:

```text
server/src/accounts/mappers/AccountMapper.ts
server/test/accounts/mappers/AccountMapper.test.ts
```

## Refactor Checklist

- [ ] Pick target domain and inventory all legacy files
- [ ] Implement module-local repository/service/controller/router layers
- [ ] Add assemblers/adapters/mappers where transformation logic exists
- [ ] Remove old duplicate files after replacement
- [ ] Add/relocate tests under mirrored `server/test/{domain}/...`
- [ ] Run Jest for the changed domain
- [ ] Update domain README and status docs

## Notes For Combat

`combat` is a canonical target pattern for structure and naming. If legacy internals still exist, use current module boundaries as source of truth and avoid copying stale compatibility paths into new modules.
