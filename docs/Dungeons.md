# Dungeons (Player Perspective)

Dungeons are currently **not implemented as a dedicated system** in the active codebase.

## Current state

- No `Dungeon` model exists in the active Prisma schema.
- No dungeon-specific server module/router is mounted in the active server bootstrap.
- There is no first-class dungeon run lifecycle (instance creation, lockouts, floors, or dungeon-specific rewards) exposed today.

## What exists that is related

Some adjacent systems can support future dungeon gameplay:

- Combat sessions and encounter scripting
- Monster definitions and loot tables
- Event and reward systems
- Map/location infrastructure

## Practical takeaway

From a player perspective, dungeon content is currently best treated as **planned/future-facing** rather than a live standalone gameplay system.
