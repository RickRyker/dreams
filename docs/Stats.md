# Stats (Player Perspective)

This is what your stats currently do in gameplay.

| Stat | What it means to you |
| --- | --- |
| **HP / Max HP** | Your health pool. Taking damage reduces HP; healing restores it up to Max HP. At 0 HP, you die/enter death flow. |
| **MP / Max MP** | Your mana pool for abilities/spells that have a resource cost. You cannot keep casting if you run out. |
| **Strength** | Improves **physical** damage in combat calculations. |
| **Dexterity** | Improves your combat **initiative** (turn order speed). |
| **Intelligence** | Improves **spell** damage in combat calculations. |
| **Charisma** | A tracked core stat that can be used by content (dialog/actions/rewards). |
| **Level** | Gates content (for example, quest eligibility checks). Also contributes to initiative. |
| **Experience (XP)** | Progress meter earned from gameplay actions (for example gathering/crafting). Used toward level progression rules. |
| **Gold** | Currency used in player trading, market purchases, NPC store buying, and selling. |

## Combat-facing formulas (current)

- **Initiative** is based on: `1 + Dexterity + Level` (minimum 1).
- **Damage scaling** uses:
  - Physical: base amount + `0.6 * Strength`
  - Spell: base amount + `0.6 * Intelligence`

## Advanced combat modifiers

These are part of your stat profile and are exposed in player/combat data:

- `critChance`
- `critDamage`
- `critResistance`
- `damageReduction`
- `spellResistance`

They are intended for combat tuning and can be granted/modified by classes, items, effects, or admin/content tools.

## Survival vitals on your character

Your character also tracks:

- **Hunger**
- **Fatigue**
- **Thirst**

These are part of your player state and can be used by systems/content, separate from the `PlayerStats` object above.