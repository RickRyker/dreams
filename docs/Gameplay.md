# Dreams of Nowhere Else and Beyond: A Journey into the Uncharted Realms of Imagination

Dreams of Nowhere Else and Beyond (nickname "Dreams") is a player content driven web-based MMORPG system.

## Gameplay
- `Exploration`: Players can explore a vast world filled with diverse environments, hidden secrets, and dynamic events.
- `Interaction`: Players can interact with NPCs, other players, and the environment to uncover quests, gather resources, and form alliances.
- `Tactical Movement`: Players can strategically navigate the world and combat grid, using terrain and positioning to their advantage in both exploration and combat.
- `Dynamic Events`: The game world features dynamic events that can occur randomly or be triggered by player actions, adding an element of unpredictability and excitement to the gameplay experience.
- `Crafting System`: Players can gather resources and craft items, weapons, and armor to enhance their abilities and customize their playstyle.
- `Player Progression`: Players can level up their characters, unlock new abilities, and acquire powerful gear as they progress through the game, allowing for a sense of growth and achievement.
- `Social Interaction`: Players can form parties, join guilds, and communicate with each other through in-game chat, fostering a sense of community and collaboration within the game world.
- `Player-Driven Economy`: Players can buy, sell, and trade items with each other, creating a dynamic in-game economy that is influenced by player actions and market trends.
- `Achievements and Rewards`: Players can earn achievements and rewards for completing quests, defeating powerful enemies, and reaching milestones in the game, providing additional incentives for exploration and combat.
- `Customization`: Players can customize their characters' appearance, gear, and abilities to create a unique identity within the game world, allowing for self-expression and individuality.

## Player Interaction and Movement
The world is navigated through a 2D tiled interface.
- **Walking**: Players move one tile at a time. Every move is an `Action` sent to the server.
- **Latency Compensation**: THe frontend uses client-side prediction to ensure movement feels instantaneous, while the **Write-Ahead Log (WAL)** ensures every step is verified and eventually persisted.
- **WAL & Buffering**: Player actions are first appended to local files in `/server/wal` via `WALService`. The `BufferService` tracks these actions and flushes them to the database in a single transaction once a threshold (defined in `WorldConfig.bufferSize`) is met. 
- **Environment and API**: Connection settings and asset URLs are controlled via centralized constants and environment variables (e.g., `VITE_API_BASE`, `VITE_S3_BUCKET_URL`).
- **Recovery**: On server startup, `BufferService.recoverAll()` checks for unflushed WAL logs and restores consistency.
- **Viewport**: The player is always centers in a 9x9 viewport rendering with **PixiJS**. As the player moves, new sections of the `AreaMap` are streamed and rendered.

## Interacting with the World
- **Interaction**: Pressing the interact key near an object (NPC, Chest, Resource) triggers a context-sensitive action.
- **Looting**: Approaching a monster corpse provides individualized loot change for all participants.
- **Shared Rewards**: Loot and gold are divided among all players in the party to maintain economic balance.
- **Experience Gains**: XP is shared among participants, scaled by level parity, and allocated to character classes based on the weapon type used. If no class matches the weapon, XP is split across all current classes. 

## Transitioning to Combat
When a player encounters an aggressive monster or initiates a duel:
- The view shifts to a tacking **16x16 grid**.
- Movement becomes turn-based.
- Players must manage their position to stay within range of targets or utilize terrain advantages.
- **Retreating**: Moving to the very edge of the combat grid allows a player to flee back to the exploration map.

