# Rendering System Documentation

The **Rendering System** is responsible for the visual representation of the game world using **PixiJS**.

## Core Components
- **TileMap Component**: The primary React component that manages the PixiJS Application. It renders the game world in a 9x9 tile viewport centered on the player.
- **Viewport Logic**: To maintain performance, the engine only renders tiles and entities within the immediate vicinity of the player character.
- **Asset Management**: Sprites are loaded dynamically. The system attempts to load form a primary **S3 Bucket** (Defined by `VITE_S3BUCKET_URL`) and falls back to **local frontend assets** if the remote load fails. 

## Layers and X-Indexing
- **Background Layer**: Terrain and static floor tiles
- **Object Layer**: Interactive elements, plants, and items
- **Entity Layer**: Players, Pets, and Monsters
- **Foreground Layer**: Overlays like treetops or roof sections that appear above the player.

## Entity Rendering
- **Players**: Rendered using class-based or gender-specific avatars defined by their `avatarId`.
- **Pets/Mosnters**: Rendered using `spriteImage` paths defined in their respective type models.
- **Filtering**: Participants can be rendered with specific tints (e.g., Red for players, Purple for monsters) or alpha transparency for effects like invisibility.

##  Auto Tiling System
The `AutoTileSystem.ts` pre-calculates bitmasks to create seamless terrain transitions.
- **Hierarchy**: The system respects a terrain hierarchy (e.g., Grass > Sand > Water, Ocean) to decide which tile "overlaps" another.
- **Bitmask Calculation**: Uses a standard 8-neighbor check to determine which of the 47 possible autotile variations to display for a specific corner/edge.

## Tile Sets
- **Metadata**: Each tileset has an associated JSON configuration defining properties like collision, animation frames, and tile IDs.
- **Atlas Support**: Sprites are loaded from texture atlases (S3-backed) to minimize draw calls and optimize GPU performance. 

## Dynamic Lighting & Effects
- **Day/Night Cycle**: The engine supports a dynamic lighting layer that transitions based on server time.
- **Particle Systems**: PixiJS-driven particle systems for magic effects, weather (rain, snow), and ambient wildlife (birds, butterfiles).

## MUD Overlay
- **Lucide React**: UI elements like status bars (MP/HP) and state indicators (Ghost Mode) are rendered as a React-based HTML overlay using **Lucide Icons** for clarity and consistency.

