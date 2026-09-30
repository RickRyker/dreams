// client/src/utils/worldToScreen.ts

export function worldToScreen(
  worldX: number,
  worldY: number,
  cameraX: number,
  cameraY: number,
  tileSize: number
) {
  return {
    x: (worldX - cameraX) * tileSize,
    y: (worldY - cameraY) * tileSize,
  };
}
