// server/src/players/services/PlayerEconomyService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerStatsRepository } from "../repositories/PlayerStatsRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

type PlayerDtoLike = ReturnType<typeof PlayerMapper.fromPrisma>;

export class PlayerEconomyService {
  constructor(
    private readonly players: PlayerRepository,
    private readonly stats: PlayerStatsRepository = new PlayerStatsRepository()
  ) {}

  async addGold(playerId: string, amount: number): Promise<PlayerDtoLike> {
    const existing = await this.stats.findByPlayerId(playerId);
    if (existing) {
      await this.stats.update(playerId, {
        gold: { increment: amount }
      });
    }
    return PlayerMapper.fromPrisma(await this.players.findById(playerId) as any);
  }

  async removeGold(playerId: string, amount: number): Promise<PlayerDtoLike> {
    const existing = await this.stats.findByPlayerId(playerId);
    if (existing) {
      await this.stats.update(playerId, {
        gold: { decrement: amount }
      });
    }
    return PlayerMapper.fromPrisma(await this.players.findById(playerId) as any);
  }

  async transferGold(fromId: string, toId: string, amount: number) {
    await this.stats.update(fromId, { gold: { decrement: amount } });
    await this.stats.update(toId, { gold: { increment: amount } });

    const from = await this.players.findById(fromId);
    const to = await this.players.findById(toId);

    return {
      from: PlayerMapper.fromPrisma(from as any),
      to: PlayerMapper.fromPrisma(to as any),
    };
  }
}
