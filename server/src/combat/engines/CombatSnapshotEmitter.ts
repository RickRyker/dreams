// server/src/combat/engines/CombatSnapshotEmitter.ts


import {
  EngineCombatEvent,
  EngineCombatResolution,
  EngineCombatSnapshot,
  EngineEntitySnapshot
} from "../types/EngineCombatTypes";

export class CombatSnapshotEmitter {
  constructor(private readonly combatId: string) {}

  private last: EngineCombatSnapshot | null = null;

  emit(event: EngineCombatEvent, resolution: EngineCombatResolution, entities: EngineEntitySnapshot[]): EngineCombatSnapshot {
    const snapshot: EngineCombatSnapshot = {
      id: crypto.randomUUID(),
      combatId: this.combatId,
      timestamp: event.timestamp,
      eventType: event.type,
      event,
      resolution,
      entities,
      createdAt: Date.now(),
    };

    this.last = snapshot;
    return snapshot;
  }

  getLastSnapshot(): EngineCombatSnapshot | null {
    return this.last;
  }

}
