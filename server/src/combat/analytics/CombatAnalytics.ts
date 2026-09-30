// server/src/combat/analytics/CombatAnalytics.ts

import {EngineCombatSnapshot} from "../types/EngineCombatTypes";

export interface ActorStats {
  id: string;
  damageDone: number;
  healingDone: number;
  damageTaken: number;
  healingReceived: number;
}

export interface CombatAnalyticsSummary {
  combatId: string;
  durationMs: number;
  actors: ActorStats[];
}

export class CombatAnalytics {
  static compute(snapshots: EngineCombatSnapshot[]): CombatAnalyticsSummary {
    if (!snapshots.length) {
      return {combatId: "", durationMs: 0, actors: []};
    }

    const combatId = snapshots[0].combatId;
    const start = snapshots[0].timestamp;
    const end = snapshots[snapshots.length - 1].timestamp;
    const durationMs = end - start;

    const stats = new Map<string, ActorStats>();

    const ensure = (id: string): ActorStats => {
      if (!stats.has(id)) {
        stats.set(id, {
          id,
          damageDone: 0,
          healingDone: 0,
          damageTaken: 0,
          healingReceived: 0,
        });
      }
      return stats.get(id)!;
    };

    for (const snap of snapshots) {
      const res = snap.resolution;

      if (res.damage && res.damage.amount > 0) {
        const src = res.damage.sourceId ?? "unknown";
        const tgt = res.damage.targetId ?? "unknown";
        ensure(src).damageDone += res.damage.amount;
        ensure(tgt).damageTaken += res.damage.amount;
      }

      if (res.heal && res.heal.amount > 0) {
        const src = res.heal.sourceId ?? "unknown";
        const tgt = res.heal.targetId ?? "unknown";
        ensure(src).healingDone += res.heal.amount;
        ensure(tgt).healingReceived += res.heal.amount;
      }
    }

    return {
      combatId,
      durationMs,
      actors: [...stats.values()],
    };
  }
}
