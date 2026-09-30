// client/src/utils/AutoTileSystem.ts

/**
 * AutoTileSystem.ts
 * Pre-calculates 3/4 perspective tiles based on terrain adjacency.
 * Hierarchy: Ocean < Water < Magma < Sand < Grass < Dirt < Rock/Hills
 */

export enum TerrainType {
    OCEAN = 0,
    WATER = 1,
    LAVA = 2,
    SAND = 3,
    GRASS = 4,
    DIRT = 5,
    ROCK = 6,
    CLIFF = 7,
    CLOUD = 8,
    ICE = 9,
    CAVE = 10,
    SKY = 12,
    SNOW = 13,
    SWAMP = 14,
    SNOW_CLIFF = 15
}

export interface RenderCell {
    bg: number;
    fg: number | null;
    isWalkable: boolean;
    overlays?: number[]; // Tile IDs from active MapEvents, sorted by priority
    bgObjectType?: string;
    fgObjectType?: string;
}

export class AutoTileSystem {
    /**
     * Pre-calculates a 256x256 map of terrain into specific PIXI tile IDs.
     */
    static processMap(terrainData: TerrainType[][]): RenderCell[][] {
        const height = terrainData.length;
        const width = terrainData[0].length;
        const result: RenderCell[][] = Array(height).fill(null).map(() => Array(width).fill(null));

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const terrain: TerrainType = terrainData[y][x];
                const mask = this.calculateBitmask(terrainData, x, y, terrain);

                // Logic mapping for Wang-style 8-neighbor auto tile
                const bgId = this.mapTerrainToTileId(terrain, mask);

                // Hill logic: Combine into Cliff
                let fgId: number | null = null;
                if (terrain === TerrainType.CLIFF) {
                    fgId = 901; // Cliff Face
                } else if (terrain === TerrainType.SNOW_CLIFF) {
                    fgId = 1801; // Snow Cliff Face
                }

                result[y][x] = {
                    bg: bgId,
                    fg: fgId,
                    isWalkable: this.checkWalkability(terrain),
                    overlays: []
                };
            }
        }
        return result;
    }

    private static calculateBitmask(data: TerrainType[][], x: number, y: number, type: TerrainType): number {
        let mask: number = 0;
        // 8 Neighbors (N, NE, E, SE, S, SW, W, NW) for Wang/Blob
        const neighbors = [ [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1] ];
        neighbors.forEach(([dx, dy], index) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < data[0].length && ny >= 0 && ny < data.length) {
                // Compatible if higher or equal in hierarchy
                if (data[ny][nx] >= type) {
                    mask |= (1 << index);
                }
            } else {
                mask |= (1 << index); // Boundary counts as neighbor
            }
        });
        return mask;
    }

    private static mapTerrainToTileId(type: TerrainType, mask: number): number {
        // ID Mapping: 0=Void, 1XX=Grass, 2XX=Dirt, 3XX=Sand, 4XX=Water, 5XX=Ocean, 6XX=Rock, 7XX=Hills->Cliffs, 8XX=Lava (was Magma)
        const baseIds: Record<number, number> = {
            [TerrainType.OCEAN]: 500,
            [TerrainType.WATER]: 400,
            [TerrainType.LAVA]: 1400,
            [TerrainType.SAND]: 300,
            [TerrainType.GRASS]: 100,
            [TerrainType.DIRT]: 200,
            [TerrainType.ROCK]: 600,
            [TerrainType.CLIFF]:900,
            [TerrainType.CLOUD]: 1200,
            [TerrainType.ICE]: 1300,
            [TerrainType.SKY]: 1500,
            [TerrainType.SNOW]: 1600,
            [TerrainType.SWAMP]: 1700,
            [TerrainType.SNOW_CLIFF]: 1800,
            [TerrainType.CAVE]: 1900,
        };
        // Simple mapping: base+mask. In production, this would use a lookup table for 47-tile Blob
        return (baseIds[type] || 0) + mask;
    }

    private static checkWalkability(type: TerrainType): boolean {
        return type !== TerrainType.WATER && type !== TerrainType.OCEAN &&
               type !== TerrainType.ROCK && type !== TerrainType.LAVA &&
               type !== TerrainType.CLIFF && type !== TerrainType.SKY &&
               type !== TerrainType.SNOW_CLIFF;
    }

}
