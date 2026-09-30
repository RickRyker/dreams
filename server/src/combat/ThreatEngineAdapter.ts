// server/src/combat/ThreatEngineAdapter.ts


import {ThreatEngine} from "./engines/ThreatEngine";
import {EngineCombatEvent} from "./types/EngineCombatTypes";

export class ThreatEngineAdapter {
  constructor(private readonly engine: ThreatEngine) {}

  applyThreatChange(event: EngineCombatEvent): void {
    if (event.type !== "THREAT_CHANGE") return;
    this.engine.apply(event as any);
  }
}
