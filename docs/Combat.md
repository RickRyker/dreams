# Dreams of Nowhere Else and Beyond: A Journey into the Uncharted Realms of Imagination

Dreams of Nowhere Else and Beyond (nickname "Dreams") is a player content driven web-based MMORPG engine.

# Combat System Documentation 

The **Combat System** provides turn-based, grid-focused tactical gameplay.

## The Combat Grid
- **Resolution**: Combat occurs on a specialized **16x16 grid**.
- **Movement**: Participants (Players, Pets, Monsters) move between grid squares.
- **Boundaries**: Moving out of the 16x26 bounds results in leaving the combat session (often treated as a retreat or defeat depending on the entity.)

## Participants
- **Players**: The primary protagonists, utilizing weapons and class skills.
- **Monsters**: Enemies defined by types and base stats from the monster encyclopedia.
- **Pets**: Companions that can attack or be used as mounts (for the Cavalier) class.

## Mechanics
- **Attack Power**: Calculated based on base stats (Strength or Dexterity), weapon quality, and Class multipliers, Classes define specific offensive and defensive bonuses in a structured schema.  
- **Element Modifiers**: Combat respects elemental affinities (FIRE, WATER, EARTH, AIR, SPIRIT). Damage is multiplied based on the attacker's element(s) vs the defender's element(s). Elements can come from weapons, armor, shields, or active spell effects. 
- **Range Validation**: Attacks are restricted by distance (Melee: 1 square; Ranged/Magic: up to 3 squares).
- **Weapon Usage**: Every attack records the weapon used, contributing to specific Class XP and potentially causing item degradation.
- **Weapon Switching**: Players can switch between `MELEE` and `RANGED` weapons during their turn, but switching restricts them to movement only for that turn.
- **XP Distribution**: Upon monster defeat, experience is shared among all players in the combat session.
  - **Shared Split**: Base XP is divided by the number of players.
  - **Level Scaling**: Rewards are scaled based on each player's level relative to the average party level using linear scaling: `1.0 - (abs(PlayerLevel - AvgLevel) / AvgLevel)`.
  - **Rounding**: All experience gains are rounded down to the nearest whole number.
  - **Multi-Class Allocation**:
    - XP is added to the class that favors the weapon used in the final blow.
    - If the weapon is not favored by any of the player's classes, or if multiple classes favor it, XP is split equally among all their classes.
    - This encourages mastering specific weapons to advance relevant classes.

## Death and Recovery
- **Damage**: Damage is subtracted from the target's health (HP) until it reaches 0.
- **Corpses**: Fallen monsters leave corpses with pre-calculated, individualistics loot.
  - **Gold**: Random range divided by the player count.
  - **Items**: Individual chance rolls per player, where the base chance is divided by the player count.
  - **Collection**: Each player collects their specific portion of the loot individually.
- **Ghost State**: Dead players become ghosts for a configurable duration.
- **Recall**: After the ghost period, players are revived at their recall point with 1 HP.




## Combat System
- `16x16 Grid-Based Combat`: The combat system is based on a 16x16 grid, allowing for strategic movement and positioning during battles.
- `Multi-Classing`: Players can choose from a variety of classes, including Cavalier, Marauder, Mage, Rogue, Archer, and Beastmaster, each with unique abilities and playstyles.
- `Pets and Mounts`: Players can summon and control pets and mounts, which can assist them in combat and exploration.
- `Tactical Movement`: Players can strategically move around the grid to gain advantages in combat, such as flanking enemies or taking cover.
- `Turn-Based Combat`: The combat system is turn-based, allowing players to carefully plan their actions and react to their opponents' moves.
- `Environmental Interactions`: Players can interact with the environment during combat, such as using terrain for cover or triggering traps.
- `Status Effects`: Players can inflict and be affected by various status effects, such as poison, stun, or burn, which can influence the outcome of battles.
- `Skill Combos`: Players can chain together skills and abilities to create powerful combos that can turn the tide of battle in their favor.
