// server/src/combat/integration/MovementIntegration.ts


import {MovementEngine, Position} from "../engines/MovementEngine";
import {PathfindingProvider} from "../Pathfinding";
import {EngineEntityId} from "../types/EngineCombatTypes";

export class MovementIntegration {
  constructor(
    private readonly movement: MovementEngine,
    private readonly pathfinding: PathfindingProvider,
  ) {}

  moveEntityTo(entityId: EngineEntityId, target: Position): void {
    const from = this.movement.getPosition(entityId) ?? {x: 0, y: 0};
    const path = this.pathfinding.findPath(entityId, from, target);

    for (const node of path.slice(1)) {
      this.movement.moveTo(entityId, node);
    }
  }

  getPosition(id: EngineEntityId): Position | null {
    return this.movement.getPosition(id);
  }
}
