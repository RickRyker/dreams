// server/src/players/services/PlayerTeleportService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

export class PlayerTeleportService {
  constructor(private readonly players: PlayerRepository) {}

  async teleport(playerId: string, mapId: string, x: number, y: number) {
    const updated = await this.players.update(playerId, {
      map: { connect: { id: mapId } },
      x,
      y,
    });

    return PlayerMapper.fromPrisma(updated);
  }
}
