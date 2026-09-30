# Monsters (Player Perspective)

This is how monsters currently work from your side of the game.

| Monster field | What it means to you |
| --- | --- |
| **Name / Description / Sprite** | What you see in the world and encyclopedia-style monster data. |
| **Level / Tier** | Indicates relative threat and scaling when used in combat. |
| **Attack Type** (`MELEE`, `RANGED`, `MAGIC`) | Tells you how the monster tends to fight. |
| **Element** | Determines elemental identity and matchup behavior in combat systems. |
| **Health / Mana** | Becomes the monster’s HP/MP when it enters a combat session. |
| **Strength / Dexterity / Intelligence / Charisma** | Core combat stats used after the monster is converted into a combat participant. |
| **Crit / Resistance stats** | Monsters can have crit chance/damage plus crit resistance, damage reduction, and spell resistance. |
| **Min/Max Gold** | Defines the monster’s gold reward range for loot generation. |
| **Loot Table** | Defines possible drops (`item`, `dropRate`, `minQty`, `maxQty`). |
| **Boss / Invasion flags** | Content tags used to classify special encounters. |

## What happens when combat starts

When a monster joins combat, it becomes a **CombatParticipant** with combat-ready stats (HP, MP, core attributes, element affinity, resistances, cooldown state, initiative, and corpse/loot state).

Current combat math uses:

- **Initiative:** `1 + Dexterity + Level` (minimum 1)
- **Physical damage scaling:** base amount + `0.6 * Strength`
- **Spell damage scaling:** base amount + `0.6 * Intelligence`

## Loot and corpse behavior

After a monster dies, loot is represented in combat data as:

- **Gold** on the defeated combat participant
- **Item drops** in `CombatLoot` rows linked to that corpse/participant

The drop source for items is the monster’s `MonsterLootTable` entries.

## Abilities and encounter behavior

Monsters can have linked abilities (`MonsterAbility`) and optional behavior scripting/JSON patterns. Boss encounters can define scripted phases (for example, health-threshold phase changes with casts/telegraphs/buffs).

## Discovery data available to players

The monsters module exposes:

- Monster list and individual monster details
- Monster types
- Monster drops

`/monsters/:monsterId/spawns` currently returns an empty result (spawn listing is not implemented yet).