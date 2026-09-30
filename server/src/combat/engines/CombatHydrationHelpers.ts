// server/src/combat/engines/CombatHydrationHelpers.ts


import {CombatParticipantDto} from "shared";
import {CombatEngine} from "./CombatEngine";

export class CombatHydrationHelpers {
  static async hydrateParticipantsAndEffects(
    engine: CombatEngine,
    participants: CombatParticipantDto[],
    loadEffectsForPlayer: (playerId: string) => Promise<any[]>,
  ): Promise<void> {
    engine.hydrateParticipants(participants);
    for (const p of participants) {
      if (p.playerId) {
        const effects: any[] = await loadEffectsForPlayer(p.playerId);
        engine.hydratePlayerEffects(p.id, effects);
      }
    }
  }
}
