# Area Map Documentation

**Area Maps** are the spatial containers where gameplay occurs.

## Technical Details
- **Grid System**: Maps are represented as a grid (e.g., 256x256).
- **Storage**: Data is stored in S3 as JSON (for layout) and Bitmasks (for collision/terrain).
- **Rendering**: Handled via PixiJS on the frontend with a 9x9 viewport centered on the player.

## Terrain & AutoTiling
The engine uses an **Auto Tile System** to handle transitions between Different terrain types:
- **Hierarchy**: Ocean < Water < Sand < Grass.
- **Bitmasking**: Transitions are pre-calculated to ensure visual consistency (e.g., proper shoreline curves).

## Components
- **Tilesets**: Visual asserts and metadata defining the appearance of the map.
- **Conditional Tile**: TIles that change appearance or behavior based on the world state or player variables.
- **Wildlife**: AreaMaps support ambient wildlife such as birds or butterflies, configured via `WildLifeSettings` (type, count, colors).
- **Containers**: Static objects like chests that can hold items.
- **Combat Grid**: When combat is initiated a specific 16x16 grid is utilized for turn-based mechanics.

