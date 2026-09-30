# Housing (Player Perspective)

Housing is currently **not implemented as a dedicated gameplay module**.

## Current state

There is no standalone house/property system yet (no house ownership, rent, room editing UI/API, or furniture-placement flow exposed as housing features).

## What exists today that is related

The schema includes a generic `Container` system that can represent storage objects:

- Optional player owner (`ownerId`)
- Optional world placement (`mapId`, `x`, `y`)
- Capacity/slot limits
- Lock flag

Inventory items can be moved between players and containers, and dropped loot creates container records in-world.

## Player-facing behavior currently available

From the active route tree, players can interact with inventory/equipment through player/inventory flows, but there is no mounted “housing” router or dedicated home-management API.

## Practical takeaway

At the moment, “housing” is best described as **future-facing**: foundational storage/world container pieces exist, but full player home ownership/customization/social housing behavior is not yet wired as a first-class system.