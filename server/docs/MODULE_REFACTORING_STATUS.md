# Module Refactoring Status

## Objective

Standardize backend domains to the canonical patterns in:

- `server/src/accounts/*`
- `server/src/players/*`
- `server/src/combat/*`

## Current Status (June 17, 2026)

- Pattern baseline exists in accounts, players, and combat domains.
- Earlier refactors documented under `server/src/modules/*` are now considered legacy.
- Test layout has been moved to mirrored `server/test/*` paths.

## Migration Backlog

- [ ] Replace legacy domains still implemented under `server/src/modules/*`
- [ ] Remove duplicate top-level domain code under `server/src/repositories/*`
- [ ] Remove duplicate top-level domain code under `server/src/services/*`
- [ ] Remove duplicate top-level domain code under `server/src/mappers/*`
- [ ] Ensure each rewritten domain has mirrored tests under `server/test/{domain}/...`

## Done In This Update

- Canonical target list now explicitly includes `server/src/combat/*`.
- Documentation now points to `server/docs/MODULE_PATTERN.md`.
- Testing convention updated to mirror `server/src/*` inside `server/test/*`.

## Next Suggested Domains

1. `world`
2. `inventory`
3. `quests`
4. `guilds`

These touch multiple systems and benefit most from early pattern alignment.
