// server/src/players/services/PlayerDeathService.ts

import { prisma } from "@prisma";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

type PlayerDtoLike = ReturnType<typeof PlayerMapper.fromPrisma>;

export class PlayerDeathService {
  constructor(private readonly players: PlayerRepository) {}

  async recordDeath(playerId: string, killerId: string): Promise<void> {
    const player: any = await this.players.findFullPlayer(playerId);
    if (!player) {throw new Error("Player not found");}
    await this.players.createPlayerDeath({
      playerId,
      level: player.level,
      killedBy: killerId ?? null,
      mapId: player.mapId,
      x: player.x,
      y: player.y,
    });
  }

  async respawn(playerId: string): Promise<PlayerDtoLike> {
    const updated = await this.players.update(playerId, {
      x: 10,
      y: 10,
      map: { connect: { id: "starter-town" } },
    });
    return PlayerMapper.fromPrisma(updated);
  }

  async getDeathHistory(playerId: string) {
    return prisma.playerDeath.findMany({
      where: { playerId },
      orderBy: { createdAt: "desc" },
    });
  }
}
