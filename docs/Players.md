# Player Documentation

The **Player** represents the in-game persona of a user. Each account user can have multiple player characters.
 
## Attributes
- **Name**: Unique identifier for the player (can be changed via admin approval).
- **Title**: Descriptive prefix/suffix unlocked through gameplay or assigned by admins.
- **Position**: Horizontal (`x`) and Vertical (`y`) coordinates on an `AreaMap`.
- **Recall Point**: A saved location (`recallMapId`, `recallX`, `recall`) where the player returns upon death or recall item use.
- **Ghost State**: A temporary states (`isGhost`) triggered by death, preventing combat for a set duration.

## Stats
- **HP (Hit Points): Current and maximum health. Reaching 0 HP triggers death.
- **MP (Mana Points): Resources for special abilities and spells.
- **Hunger**: Increases over time; must be satiated with food. Higher hunger impacts health.
- **Fatigue**: Increases with actions; exhaustion affects performance. Remove fatigue through the use of beds.
- **Gold**: Universal currency for buying/selling items in Stores.
- **Experience & Level**: Earned through combat and quests to improve base stats. 

## Progression
- **Classes**: Players can specialize in classes like Cavalier, Marauder, Mage, etc. Multi-classing is supported. 
- **Experience Allocation**: For multi-classing players, XP is directed to the class that favors the weapon used in combat. If no class matches the weapon type, XP is divided equally.
- **Skills**: Granular proficiency in activities (e.g., Swords, Mining, Cooking).
- **Inventory**: A collection of items carried by the player, subject to weight limits.
- **Player Events**: Tracking of specific player actions or milestones (e.g., `PETS_SACRIFICED`, `TREES_CUT`). These are used for progression checks and awarding achievements.
- **Achievements**: Permanent markers of significant milestones (e.g., `SLUG_KILLER`).

## Social
- **Guild Membership**: Players can join guilds to collaborate, share resources, and gain reputation.
- **Titles**: Bragging rights displayed alongside the player name.

## Administrative & Preferences
- **Permissions**: Granular control over system access, such as map editing, bypassing maintenance, or shadow-ban management.
- **Preferences**: Customizable settings including color themes (e.g., High Contrast, Protanopia) and message filters.
- **Roles**: Users are assigned roles (e.g., `PLAYER`, `ADMIN`, `NAME_CHANGE_MODERATOR`) that determine their permissions. The roles are attached to a specific player character so that a user can have both an admin and a non-admin player character for testing out functionality. 
