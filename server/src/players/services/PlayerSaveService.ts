// server/src/players/services/PlayerSaveService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";
import type { PlayerProfileDomain, PlayerUpdateCommand } from "../domain/PlayerDomain";

export class PlayerSaveService {
  constructor(private readonly players: PlayerRepository) {}

  async update(playerId: string, dto: PlayerUpdateCommand): Promise<PlayerProfileDomain> {
    const prismaUpdate = PlayerMapper.toPrisma(dto);
    const model = await this.players.update(playerId, prismaUpdate);
    return PlayerMapper.fromPrisma(model);
  }

  async updatePosition(playerId: string, x: number, y: number): Promise<PlayerProfileDomain> {
    const model = await this.players.update(playerId, { x, y });
    return PlayerMapper.fromPrisma(model);
  }

  async updateMap(playerId: string, mapId: string | null): Promise<PlayerProfileDomain> {
    const model = await this.players.update(playerId, {
      map: mapId ? { connect: { id: mapId } } : { disconnect: true },
    });
    return PlayerMapper.fromPrisma(model);
  }
}
