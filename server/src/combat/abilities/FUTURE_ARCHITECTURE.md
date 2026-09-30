# 📘 Moving Ability Definitions Into a Database (Future Architecture Plan)

## Overview
Right now, all ability definitions live in TypeScript files.
This is correct for the engine‑building phase because it keeps iteration fast, safe, and flexible.

Later, as the engine stabilizes and content production ramps up, the ability system should transition to a data‑driven, database‑backed model.

## This document outlines:

- When to move abilities into a DB
- Why to move them
- When not to move them
- The ideal migration timeline
- What the final architecture looks like

----

## 🧭 When to Move Abilities Into a Database
You should migrate AbilityDefinitions into a database when you need runtime configurability or non‑developer editing.

✔ 1. When designers need to edit abilities without redeploying
If you want game designers or content creators to adjust:
- damage
- cooldown
- cast time
- telegraph size
- DOT/HOT durations
- resource costs
…without touching code, you need DB‑backed definitions.

✔ 2. When you want live hot‑patching
If you want to adjust abilities while the server is running, you need:
- DB storage
- reload mechanism
- versioning
- rollback support

This is how AAA MMO studios operate.

✔ 3. When you want modding or user‑generated content
If you want:
- custom abilities
- modded servers
- ability packs
- dynamic content loading
…then abilities must be data‑driven.

✔ 4. When you want analytics‑driven balancing
If you want to analyze:
- overperforming abilities
- underperforming heals
- PvP vs PvE tuning
- raid vs dungeon tuning
…you need ability definitions in a DB with version history.

✔ 5. When you want multiple game modes
Example:
- PvE Fireball: 50 dmg
- PvP Fireball: 35 dmg
- Raid Fireball: 60 dmg
This becomes trivial with DB‑backed definitions.

✔ 6. When you want localization
Ability names, descriptions, and tooltips should eventually be localized.
This requires DB storage.

✔ 7. When you want a full content pipeline
Eventually you’ll want:
- ability editor UI
- telegraph visualizer
- damage formula editor
- buff/debuff browser
This requires DB‑backed definitions.

----

## 🚫 When NOT to Move Abilities Into a Database (Yet)
You should not move abilities into a DB until:
- AbilityDefinition is stable
- AbilityScript interface is stable
- CastEngine is stable
- TelegraphEngine is stable
- EffectEngine is stable
- Targeting rules are stable

Moving to a DB too early causes:
- constant migrations
- schema churn
- slower iteration
- harder debugging
Right now, TypeScript definitions are perfect.

## 🕒 Ideal Migration Timeline
### Phase 1 — Engine Prototyping (NOW)
Abilities in TypeScript
Scripts in TypeScript
Registry is static
No DB needed

### Phase 2 — Engine Stabilization
AbilityDefinition stops changing daily
Scripts stabilize
Targeting rules stabilize
Telegraph metadata stabilizes

### Phase 3 — Data‑Driven Abilities
Move AbilityDefinition to DB
Keep AbilityScript in TypeScript
Registry loads definitions from DB
Designers can edit abilities live

### Phase 4 — Full Content Pipeline
Web UI for editing abilities
Versioning
Rollbacks
Analytics integration
Hot‑patching

This is the real MMO workflow.

----

## 🏗 Final Architecture (Future)
```
AbilityDefinition (DB)
AbilityScript (TypeScript)
AbilityRegistry (loads from DB)
CastEngine (uses registry)
TelegraphEngine (uses registry)
EffectEngine (uses registry)
SnapshotEmitter (records ability metadata)
ReplayRecorder (records ability metadata)
```
Scripts stay in code.
Definitions move to data.
This is the ideal hybrid model.

----
