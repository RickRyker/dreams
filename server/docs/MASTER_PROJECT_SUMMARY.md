# Server Refactoring Master Summary
## Project Direction
The backend migration target is now explicitly based on three canonical domains:
- `server/src/accounts/*`
- `server/src/players/*`
- `server/src/combat/*`
These domains define the active pattern for all future rewrites.
## Canonical Architecture
```text
Router -> Controller -> Assembler -> Service -> Adapter -> Mapper -> Repository -> Prisma
```
## Key Standards
- Domain-local folder boundaries under `server/src/{domain}/...`
- PascalCase class/file naming in domain folders
- Repository-only Prisma access
- DTO to/from model transformation in assemblers
- Prisma to/from model transformation in adapters/mappers
- Error propagation via Express middleware (`next(err)`)
## Testing Standard
Tests are organized under `server/test/*` and mirror system-under-test paths under `server/src/*`.
## Legacy Scope Being Replaced
- `server/src/modules/*` domains using earlier patterns
- Top-level duplicated domain files under:
  - `server/src/repositories/*`
  - `server/src/services/*`
  - `server/src/mappers/*`
## Active Documentation
- `server/docs/MODULE_PATTERN.md` (canonical reference)
- `server/docs/MODULE_REFACTORING_GUIDE.md` (how to refactor)
- `server/docs/MODULE_REFACTORING_STATUS.md` (status and backlog)
## Immediate Focus
1. Replace remaining legacy modules with domain-local implementations.
2. Keep naming and layering aligned to accounts/players/combat.
3. Maintain mirrored tests in `server/test/*` for all rewrites.
