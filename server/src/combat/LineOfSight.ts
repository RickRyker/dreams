// server/src/combat/LineOfSight.ts


import {Position} from "./engines/MovementEngine";

export interface Obstacle {
  x: number;
  y: number;
  radius: number;
}

export class LineOfSightSystem {
  private obstacles: Obstacle[] = [];

  addObstacle(o: Obstacle): void {
    this.obstacles.push(o);
  }

  clear(): void {
    this.obstacles = [];
  }

  hasLineOfSight(from: Position, to: Position): boolean {
    for (const o of this.obstacles) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const fx = o.x - from.x;
      const fy = o.y - from.y;

      const t = (fx * dx + fy * dy) / (dx * dx + dy * dy);
      if (t < 0 || t > 1) continue;

      const closestX = from.x + t * dx;
      const closestY = from.y + t * dy;

      const dist = Math.sqrt(
        (closestX - o.x) ** 2 + (closestY - o.y) ** 2,
      );

      if (dist <= o.radius) return false;
    }

    return true;
  }
}
