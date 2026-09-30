# Dreams of Nowhere Else and Beyond Engine Elements

## Core Entities

### Account & Player
- **Account**: The account holder, linked to multiple OAuth providers.
- **Player**: The in-game persona. Tracks location (`mapId`, `x`, `y`), `PlayerStats`, and assigned **Titles**. 
- **PlayerStats**: Survival metrics including `HP`, `MP`, `Hunger`, and `Fatigue`.

### Combat & Classes
- **Class System**: Players can be single or **Multi-Class**. Supported classes: `Cavalier`, `Marauder`, `Mage`, `Rogue`, `Archer`, and `Beastmaster`. 
- **Bonuses & Requirements**: Classes specify percentage-based power bonuses and requirements (e.g., minimum stats, specific quests) within structured schemas.
- **Favored Weapons**: Each class has a `favoredWeapon` (e.g., Archer favors `BOWS`, Marauder favors `AXES`).
- **XP Splitting**: Multi-classes players earn XP for the class that favors the weapon used during the killing action. If no specific class matches, XP is split equally among all their classes.
- **Combat Map**: A specialized **16x16 grid** for turned-based encountered. Leaving the map bounds results in defeat.

### Death & Resurrection
- **Death & Ghost State**: When a Player's HP reaches 0, they do not die immediately. Instead, they enter a **Ghost State** for a configurable duration (default: 5 minutes). In this state, they are removed from active combat.
- **Resurrection**: Another Player, who has the Shaman skill, observing a Player in **Ghost State**, may attempt to resurrect that player, and if successful they will be resurrected from **Ghost State** with 1 HP, where they are.
- **Recall Point**: Every Player has a designated **Recall Point** (initially the Tutorial start location).
- **Revival**: After the Ghost State duration expires, the player is automatically recalled to their Recall Point and revived with **1 HP**. Admins can also manually trigger this recall.

### Experience (XP) Rewards
- **XP Scaling**: Rewards are scaled linearly based on the player's level relative to the average party level. All gains are rounded down (`Math.floor`).
- **Loot Table Persistence**: Monsters corpses store individualized loot results (gold and items) pre-calculated based on current attendance.

### Guilds & Social
- **Guild Creation**: Players of a sufficient level (default: 5), configurable in world configuration) can create guilds.
- **Membership**: Players can join guilds after reaching a minimum level (default: 5, configurable in world configuration).
- **Ranks**: Guilds feature a hierachical rank system (0-9). Each rank has a structured permission set (e.g., `canInvite`, `canKick`, `canPromote`).
- **Treasury & Tagging**: Members can "tag" inventory items for the guild treasury, allowing for group asset management and credit systems.
- **Guild Logs**: Transparent audit trails for treasury actions (donations/withdrawals) and membership changes (joins/leaves/promotions).

### Companions & Pets
- **Pets**: Loyal companions that participate in combat. Pets have types (Melee, Ranged, Magic) and unique base stats.
- **Mounts**: Certain pets are **Mountable**. Cavaliers can use these pets as mounts in combat, merging their movement on the grid.
- **Pet Sacrifice & Eggs**: Advanced players can sacrifice specific combinations of pets at designated locations to obtain a **Pet Egg**, which hatches into a more powerful creature over time.

### Crafting & Skills
- **Cooking**: Combine food and herbs via recipes to create consumables and increase the **Cooking** skill.
- **Alchemy & Scribing**: Specialized crafting to brew **Potions** (liquid spells) and scribe **Scrolls** (inscribed spells).
  - Requires specific tools (**Cauldron**, **Scribing Pen**) and consumables (**Potion Flask**, **Parchment**, **Ink**).
  - Creators infuse items with their own magical energy, incurring a permanent **Mana Cost**.
- **Crafting**: Use **Blueprints** and raw materials to build items, bound by the **Crafting** skill level.
- **Painting**: Mix **Pigments** and other ingredients to create custom paints for item personalization.
- **Recipes & Blueprints**: Items that unlock the ability to craft specific goods. Can also be discovered experimentally by combining ingredients manually.

### Gameplay
- **AreaMap**: A 256x256 grid. Maps are stored in S3 as JSON/Bitmask pairs and support autotiling (Ocean < Water < Sand < Grass).
- **Action**: THe atomic unit of gameplay. Types include `MOVE`, `INTERACT`, etc. Actions are first recorded in the **Write-Ahead Log (WAL)** before being buffered and flushed to the database
- **Item & Inventory**: Items have types (e.g., `FOODS`, `SWORDS`, `PIGMENTS`, `RECIPES`, `PET_EGGS`, `POTIONS`, `SCROLLS`) and properties like weight, degradation, and breakage.
    - **Quality**: A rating system beginning from **F** and increasing to **A** and above that is determined by material quality and significantly impacts item effectiveness.
- **Quest**: Tasks or missions with structured `requirements` (levels, items, skills) and `rewards` (experience, gold, items, titles). Progress is tracked via custom variables.
- **Magic School**: The **Arcane Academy** provides a location for players (level 5+) to study and learn new spells.

### Metadata & Logs
- **Message Logs**: In-game notification and interation audit history.
- **Profanity**: Regex patterns uses to filter Player names and chat. Patterns are managed by administrators.
- **IP Access Logs**: Tracking system for security that manges trust levels and handles **Shadow Banning** for malicious actors.
- **Player Events**: Granular tracking of player progress for achievements (e.g., `TREES_CUT`, `BUTTERFLIES_CAUGHT`). Skills include combat (Swords, Axes), gathering (Mining, Wood Cutting), and utility (Looting).
- **Map Events**: Configurable triggers at specific coordinates that check structured conditions (player level, global variables via comparison operators before executing actions like transitions or messages.

## Technical Elements
- **WAL System**: Write-Ahead Logging (in `server/wal`) for high-concurrency actions. Actions are appended to the local logs first.
- **Buffer System**: Coordinates with the WAL to track un-flushed actions. Once a threshold is reached, a single Prisma transaction persists the data.
- **Maintenance Mode**: A global state that locks the game for the regular players while allowing admins (or those with `BYPASS_MAINTENANCE`) to perform updates or process decay.
- **Prisma**: ORM for MySql.
- **PixiJS**: Frontend rendering engine.
- **Auto Tile System**: Pre-calculates bitmasks for terrain transitions to ensure visual consistency on the map.
- **Lucide Icons**: Standardization for UI iconography.

## Inventory System
- **Anti-Spam**: Incorporates `antiSpamMiddleware` to protected inventory and combat endpoints.
- **Engraving**: Advanced players can use an `Engraving Pen` to enhance items. This process consumes mana and requires specific skills.
- **Gem Cutting & Embedding**: High-level lapidary skills are required to cut raw gems and embed them into equipment, providing significant stat boosts. This requires the `LAPIDARY_BENCH` station.
- **Shadow Banned Interactions**: Name requests or chat from shadow-banned IPs are silently ignored or queued without effect.

## System Events
- **Holidays**: The `HolidayService` manages date-based global bonuses (e.g., XP multipliers).
- **NPC ChatBots**: NPCs can be configured as `ChatBot` entities that respond to specific player messages or triggers using regex patterns.

## Audit Logging
- **Interaction Logs**: Managed by `AuditLogService`, dual-streaming to the `MessageLog` table and a local `interaction_audit.lgo` for S3 offloading.
- **Admin Log**: Administrative actions are tracked separately in `logs/admin.log` via the Winston logging library.

~~~~

