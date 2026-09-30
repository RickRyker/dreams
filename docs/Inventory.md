# Inventory System Documentation

THe **Inventory System** manages the lifecycle and storage of all items in the world.

## Storage Types
- **Player Inventory**: Items carried directly by the player persona.
- **Containers**: Non-player storage including Chests, Bank vaults, and Guild (Clan) storage.
- **Stores**: Specialty containers for purchasing and selling items using **Gold**.
- **World Items**: Items can exist as loot within corpses or as static map elements before being picked up.

## Item Lifecycle
- **Acquisition**: Items are obtained through looting, crafting, or quest rewards. Purchasing from a Store requires sufficient Gold and deducts the amount form the player's stats.
  - **Quality**: THe quality of crafted items (F to A and higher) is determined by the quality of the materials used.
- **Equipping**: Items with a valid `SlotType` can be equipped by the player to modify stats (e.g., Strength, Max HP). Equipping a potion flask may be required to consume "Liquid Spells". 
- **Degradation**: Items lose durability (0 to 100,000) through use or time.
- **Breaking**: When an item reaches maximum degradation, it becomse `isBroken` and its bonuses are disabled.
- **Decay**: Perishable items (like food) degrade over time (based on `decayRate`) during system maintenance cycles. 

## Advanced Mechanics
- **Tagging**: Items can be "Guild Tagged" to move them into the guild treasury system.
- **Engraving**: Items can be permanently improved or imbued with elemental power using an **Engraving Pen**. This process consumes mana and rare materials.
- **Liquid Spells**: Consumables (Potions) that apply spell effects. Drinking a potion costs 1 MP.
- **Droppable/Tradeable**: Items can be restricted from being dropped or traded via `isDroppable` and `isTradeable` flags.
- **Weight**: Total item weight influences player movement and inventory capacity.
- **Tool Requirements**: Certain items require specific tools to be crafted or used.
- **Gemwork**: Faceted grms can be embedded into equipment to provide stat boosts. This process is governed by level requirements (item level vs gem quality). Gems can be **trimmed** to fit lower-level items at the cost of quality, producing **Gem Dust**. Removing gems is risky and can lead to the them being shattered or cracked.

## Slot Types
- **Inventory**: The persistent collection if items held by a player. Melee weapons (axes, swords, etc.) occupy the `WEAPON` slot, while ranged equipment (bows, slings) occupies the `RANGED` slot.
- **Equipment Manager**: The UI component allowing players to assign items to specific body slots. Now includes dedicated slots for `WEAPON` and `RANGED` types, as well as distinct `RING1` and `RING2` slots.



