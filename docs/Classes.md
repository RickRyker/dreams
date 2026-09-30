# Classes (Player Perspective)

This is how classes currently work in the live code.

## What a class does

A class defines your character specialization profile:

- Name and description
- Primary/secondary stat tags
- Favored weapon tag
- Growth data (`statGrowth`)
- Optional bonus/starting-spell metadata

## Player class assignment

Your character can hold class links through `PlayerClass` records (`playerId + classId`).

Current behavior:

1. Class assignment uses upsert (assigning the same class again does not duplicate it).
2. You can remove an assigned class.
3. You can list all classes on your character.

## Starter class behavior

Character creation assigns a starter class (`Novice`) through the player creation flow.

## Class APIs currently exposed

Via the mounted `/class` router:

- `GET /class` — list classes
- `GET /class/:classId` — get one class
- `GET /class/player/:playerId` — get one player-class relation
- `POST /class/player/:playerId/assign/:classId` — assign class
- `DELETE /class/player/:playerId/remove/:classId` — remove class

## Current implementation notes

- Class metadata includes rich fields in persistence, but DTO output currently focuses mainly on `id`, `name`, `description`, and `statGrowth`.
- `PlayerClass` stores per-class `level` and `experience` fields in the schema, but current class DTO/service responses do not surface those progression values yet.