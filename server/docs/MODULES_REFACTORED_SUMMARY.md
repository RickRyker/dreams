# Modules Refactored Summary
## Canonical Pattern Set
Future backend module work must follow:
- `server/src/accounts/*`
- `server/src/players/*`
- `server/src/combat/*`
## Pattern Shape
```text
Router -> Controller -> Service -> Adapter -> Mapper -> Repository -> Prisma
```
## Testing Layout
Tests must be placed under `server/test/*` and mirror the path of the module in `server/src/*`.
## Legacy Modules
Previously refactored legacy modules under `server/src/modules/*` are considered transitional and should be replaced over time with the canonical domain-local layout.
## Migration Priorities
1. Remove duplicate logic from top-level `repositories`, `services`, and `mappers` folders.
2. Rewrite remaining `modules/*` domains into first-class domain folders.
3. Keep naming and layering consistent with accounts/players/combat.
