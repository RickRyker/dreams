// server/src/combat/persistence/CombatPersistencePort.ts

import {EngineCombatSnapshot} from "../types/EngineCombatTypes";
import {CompressedReplay} from "../replay/CombatReplayCompressor";
import {CombatAnalyticsSummary} from "../analytics/CombatAnalytics";

export interface CombatPersistencePort {
  // snapshot pipeline
  persistSnapshot(snapshot: EngineCombatSnapshot): Promise<void>;
  loadSnapshots(combatId: string): Promise<EngineCombatSnapshot[]>;

  // replay pipeline
  persistReplay(
    combatId: string,
    replay: CompressedReplay,
    summary: CombatAnalyticsSummary
  ): Promise<void>;

  loadReplay(combatId: string): Promise<any | null>;

  // log export
  exportLogs(combatId: string, format: "json" | "html"): Promise<string>;

  // hydration
  listParticipants(combatId: string): Promise<any[]>;
  listPlayerEffects(playerId: string): Promise<any[]>;

  // human-readable logs
  saveLogEntries(entries: any[]): Promise<void>;
}
