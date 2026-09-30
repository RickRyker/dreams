// server/src/combat/engines/MovementEngine.ts


import {EngineEntityId} from "../types/EngineCombatTypes";
import {CombatEventBus} from "../CombatEventBus";

export interface Position {
  x: number;
  y: number;
}

export class MovementEngine {
  private readonly positions: Map<EngineEntityId, Position> = new Map<EngineEntityId, Position>();

  constructor(private readonly bus: CombatEventBus) {}

  setPosition(id: EngineEntityId, x: number, y: number): void {
    this.positions.set(id, {x, y});
  }

  moveTo(id: EngineEntityId, pos: Position): void {
    const from = this.positions.get(id) ?? {x: 0, y: 0};
    this.positions.set(id, pos);
    this.bus.emit({ type: "MOVE", timestamp: Date.now(), entityId: id, from, to: pos });
  }

  getPosition(id: EngineEntityId): Position | null {
    return this.positions.get(id) ?? null;
  }

}
