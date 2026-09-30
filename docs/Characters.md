# Characters (Player Perspective)

This is how player characters currently work in the live code.

## What a character is

A **character** is your `Player` record under an account.  
One account can have multiple characters.

Character identity includes:

- Name, title, gender
- Map position (`mapId`, `x`, `y`)
- Default-character flag (`isDefault`)
- Combat/life state (ghost, invisibility, hunger/fatigue/thirst)
- Linked progression data (stats, class, inventory, equipment, spells, skills, quests, etc.)

## Character selection behavior

When loading your default character, the server:

1. Lists all characters on your account.
2. Picks the one marked `isDefault`.
3. Falls back to the first character if none is marked default.

## Character profile data you can load

The hydrated character payload includes:

- Basic identity/location
- Full stats block
- Equipment
- Inventory
- Spells
- Skills
- Quest data (hydrated by the player hydration service)

## Character lifecycle (current)

- **Create:** character creation service exists and applies starter presets:
  - Spawn: `starter-town` at `(10,10)`
  - Starter stats, items, spell, skill, and class
- **List:** returns compact character cards (`id`, `name`, `level`, `class`, `isDefault`, `createdAt`)
- **Delete:** supported by player delete route/service

## Current implementation notes

- The data model supports `isDefault`, and default loading uses it.
- Repository support exists to set a default character, but a dedicated public route for “set default” is not wired in the active player router.
- Character creation route wiring currently expects an `accountId` route param inside the controller, while the mounted route does not provide one.