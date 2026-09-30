// server/src/players/services/PlayerCombatStateService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

export class PlayerCombatStateService {
  constructor(private readonly players: PlayerRepository) {}

  async enterCombat(playerId: string, combatId: string) {
    const updated = await this.players.update(playerId, {
      activeCombat: { connect: { id: combatId } },
    });

    return PlayerMapper.fromPrisma(updated);
  }

  async leaveCombat(playerId: string) {
    const updated = await this.players.update(playerId, {
      activeCombat: { disconnect: true },
    });

    return PlayerMapper.fromPrisma(updated);
  }

  async isInCombat(playerId: string): Promise<boolean> {
    const player = await this.players.findById(playerId);
    return !!player?.activeCombatId;
  }
}
