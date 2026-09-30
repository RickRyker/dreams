// server/src/players/services/PlayerMovementService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

type PlayerDtoLike = ReturnType<typeof PlayerMapper.fromPrisma>;

export class PlayerMovementService {
  constructor(private readonly players: PlayerRepository) {}

  async move(playerId: string, x: number, y: number): Promise<PlayerDtoLike> {
    const updated = await this.players.update(playerId, { x, y });
    return PlayerMapper.fromPrisma(updated);
  }

  async changeZone(playerId: string, mapId: string, x: number, y: number): Promise<PlayerDtoLike> {
    const updated = await this.players.update(playerId, {
      map: { connect: { id: mapId } },
      x,
      y,
    });

    return PlayerMapper.fromPrisma(updated);
  }

  async moveByDelta(playerId: string, dx: number, dy: number): Promise<PlayerDtoLike> {
    const player = await this.players.findById(playerId);
    if (!player) throw new Error("PLAYER_NOT_FOUND");

    const updated = await this.players.update(playerId, {
      x: player.x + dx,
      y: player.y + dy,
    });

    return PlayerMapper.fromPrisma(updated);
  }
}
