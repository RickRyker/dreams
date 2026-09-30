// server/src/combat/MovementController.ts


import {EngineEntityId} from "./types/EngineCombatTypes";
import {MovementEngine, Position} from "./engines/MovementEngine";
import {PathfindingProvider} from "./Pathfinding";

export class MovementController {
  constructor(
    private readonly movement: MovementEngine,
    private readonly pathfinding: PathfindingProvider,
  ) {}

  moveEntityAlongPath(entityId: EngineEntityId, target: Position): void {
    const from: Position = this.movement.getPosition(entityId) ?? {x: 0, y: 0};
    const path: Position[] = this.pathfinding.findPath(entityId, from, target);

    for (const node of path.slice(1)) {
      this.movement.moveTo(entityId, node);
    }
  }

}
