# Spells System

The Magic System in the MMORPG engine allows player to cast powerful spells and use magical items (scrolls and potions) to influence combat and survival.

## Spell Properties
Each spell is defined by several core attributes.
- **Slug**: A unique identified (e.g., `fireball`).
- **Name**: The display name of the spell.
- **Description**: A flavor text or technical description.
- **Element**: THe elemental affinity (FIRE, WATER, EARTH, AIR, SPIRIT, NONE).
- **Requirements**:
    - `minLevel`: Minimum character level required.
    - `minBaseIntel`: Minimum base intelligence required to learn.
    - `castIntelReq`: Minimum intelligence (including buffs) required to cast.
  - **Costs**:
    - `manaCost`: MP consumed upon casting.
    - `hpCost`: HP consumed (for dark/sacrificial magic).
  - **Targeting**:
    - `targetType`: SELF, PLAYER, MONSTER, or AREA.
    - `range`: Maximum distance for targeting (0 = self).
    - `areaEffect`: Radius for area-of-effect spells.

## Casting Logic
Spells are processed through the `MagicService`. Casting involves:
1. **Validation**: Checking requirements, mana/HP costs, and range.
2. **Execution**:
     - Direct Stat Modifications (e.g., healing HP, restoring MP),
     - Application of **Active Spell Effects** (buffs/debuffs).

## Active Spell Effects
Long-lasting magical effects are stored in the `ActiveEffect` table. These effects track:
- **Expiration**: THe `expiresAt` timestamp determines when the effect fades.
- **Stacking**: Multiple different spells can be active on a player simultaneously.
- **Elemental Buffs**: Spells can imbue a player with a temporary element that stacks with their equipment during combat calculation.

## Liquid Spells (Potions)
Potions and consumables can act as "Liquid Spells". When used:
- They trigger a spell effect without requiring the player to "know" the spell.
- The `MagicService` attributes the power of the effect to the creator of the items (if applicable, for XP gain).
- Brewing requires a **Cauldron** and **Potion Flasks**. 

## Inscribed Spells (Scrolls)
Scrolls allow players to carry single-use powerful enchantments:
- Similar to potions, but categorized as `SCROLLS`.
- Scribing requires a **Scribe Pen**, **Parchment**, and **Ink**.
- Scribing/Brewing incurs a permanent **Mana Cost** to the creator, infusing the item with magical energy.

## Magical Inscription (Engraving)
Advanced magical imbuement on permanent equipment:
- Requires an **Engraving Pen**, often obtained through higher-level quests.
- Costs significant MP and rare materials (like **Gem Dust** or **Rare Gems**).
- Can permanently imbue an item with elemental power increase its quality grade.

## Magic School
The **Arcane Academy** is a specialized location where players can study and learn new spells.
- **Access**: Restricted by the "Apprentices' Path" quest and a minum level (default 5).
- **Study**: Learning a spell requires meeting `minLevel` and `baseIntelligence` requirements.
- **Mentors**: Future updates will include specialized mentors for different elemental branches.

## Cleanup
The server runs a periodic cleanup task to removed expired `ActiveEffect` records from the database, ensuring the only active buffs and debuffs affect gameplay performance.
