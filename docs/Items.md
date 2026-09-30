# Items Documentation

**Items** are the primary objects of interaction, crafting, and trade.

## Item Properties
- **Type**: Categorization (e.g., FOODS, SWORDS, MATERIALS, PET_EGGS).
- **Weight**: Affects player carring capacity.
- **Durability/Degradation**: Items lose quality through use or time.
- **Breakage**: High degradation leads to the `isBroken` state, rendering the item unusable until repaired.
- **Tradable/Droppable**: Constraints on how the item can be transferred.
- **Element**: Weapons and armor can possess elemental attributes (FIRE, WATER, EARCH, AIR, SPIRIT).
- **Pricing**: `buyPrice` and `sellPrice` determine the gold value of items in Stores.

##Inventory
- **Containers**: Items can be stored in Player inventories, Guild treasuries, Bank vaults, or Mapl-level Chests.
- **Equipping**: Items with `SlotType` (Head, Chest, Hands, etc.) can be equipped to provide stat bonuses. The engine manages weapons in `WEAPON` and `RANGED` slots.
- **Quality**: Items and inmventory instances have a `QualityType` (F to A and above) which significantly impacts their effectiveness and value. Quality is influenced by material choice during crafting. 

## Special Items Types
- **Recall Items**: Trigger the "Recall to Home" mechanic.
- **Recipes & Blueprints**: Consumables that teach the player how to craft specific items and objects. Creating an encyclopedic item template rewards the creator with 10 blueprints.
- **Tools**: Required for specific crafting actions (e.g., `cauldron` for potions, `scribe-pen` for scrolls, `engraving-pen` for engraving).
- **Gemstones**: Raw minerals that cna be cut into faceted gems using `Gem Cuttiny Tools` at a `LAPIDARY_BENCH`.
- **Potions/Scrolls**: One-time use magical items that trigger spell effects.
- **Consumables**: Materials like `parchment`, `ink`, or `potion-flask` that are consumed during crafting. Engraving requires rare materials like `rare-gem`. 
- **Pigments/Paints**: Used in the Painting skill for customization.
- **Pet Eggs**: Require specific conditions (and sometimes sacrifices) to hatch.
- **Embedded Gems**: Items can contain up to one faceted gem. These gems provide a `statEffects` bonus based on their quality and the cutter's skill.
- **Gem Dust**: A byproduct of trimming gems, used as a primary ingredient in high-level Engracing and Alchemy.

