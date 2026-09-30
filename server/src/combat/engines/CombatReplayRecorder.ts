// server/src/combat/engines/CombatReplayRecorder.ts


import {
  EngineCombatEvent,
  EngineCombatResolution,
  EngineCombatSnapshot,
} from "../types/EngineCombatTypes";

export interface CombatReplayRecord {
  combatId: string;
  timestamp: number;
  event: EngineCombatEvent;
  resolution: EngineCombatResolution;
  snapshot: EngineCombatSnapshot;
}

export class CombatReplayRecorder {
  private readonly records: CombatReplayRecord[] = [];

  constructor(private readonly combatId: string) {}

  recordEvent(
    event: EngineCombatEvent,
    resolution: EngineCombatResolution,
    snapshot: EngineCombatSnapshot,
  ): void {
    this.records.push({
      combatId: this.combatId,
      timestamp: event.timestamp,
      event,
      resolution,
      snapshot,
    });
  }

  getReplay(): CombatReplayRecord[] {
    return this.records;
  }

  clear(): void {
    this.records.length = 0;
  }
}
