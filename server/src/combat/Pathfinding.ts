// server/src/combat/Pathfinding.ts


import {EngineEntityId} from "./types/EngineCombatTypes";
import {Position} from "./engines/MovementEngine";

export interface PathfindingProvider {
  findPath(entityId: EngineEntityId, from: Position, to: Position): Position[];
}

export class StraightLinePathfinding implements PathfindingProvider {
  findPath(_entityId: EngineEntityId, from: Position, to: Position): Position[] {
    return [from, to];
  }
}
