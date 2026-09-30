// server/src/combat/replay/CombatReplayCompressor.ts

import {EngineCombatSnapshot} from "../types/EngineCombatTypes";

export interface CompressedReplayFrame {
  t: number;
  e: string;
  s?: any;
}

export interface CompressedReplay {
  combatId: string;
  frames: CompressedReplayFrame[];
}

export class CombatReplayCompressor {
  static compress(snapshots: EngineCombatSnapshot[]): CompressedReplay {
    if (!snapshots.length) return {combatId: "", frames: []};

    const combatId: string = snapshots[0].combatId;
    const frames: CompressedReplayFrame[] = snapshots.map((snap: EngineCombatSnapshot): CompressedReplayFrame => ({
      t: snap.timestamp,
      e: snap.eventType,
      s: {
        entities: snap.entities.map((e) => ({
          id: e.entityId,
          hp: e.hp,
          sh: e.shield ?? 0,
          d: e.interrupted ?? false,
        })),
      },
    }));

    return {combatId, frames};
  }
}
