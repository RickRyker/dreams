// server/src/players/adapters/PlayerAdapter.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";

type PlayerDtoLike = ReturnType<typeof PlayerMapper.fromPrisma>;

type PlayerCreateLike = {
  name?: string;
};

type PlayerUpdateLike = {
  name?: string;
  isDefault?: boolean;
  mapId?: string | null;
  x?: number;
  y?: number;
};

export class PlayerAdapter {
  constructor(private readonly players: PlayerRepository) {}

  async create(accountId: string, dto: PlayerCreateLike): Promise<PlayerDtoLike> {
    const model = await this.players.createPlayer(accountId, dto.name);
    return PlayerMapper.fromPrisma(model);
  }

  async findById(id: string): Promise<PlayerDtoLike | null> {
    const model = await this.players.findById(id);
    return model ? PlayerMapper.fromPrisma(model) : null;
  }

  async list(accountId: string): Promise<PlayerDtoLike[]> {
    const models = await this.players.listPlayers(accountId);
    return models.map(PlayerMapper.fromPrisma);
  }

  async update(id: string, dto: PlayerUpdateLike): Promise<PlayerDtoLike> {
    const prismaUpdate = PlayerMapper.toPrisma(dto);
    const model = await this.players.update(id, prismaUpdate);
    return PlayerMapper.fromPrisma(model);
  }
}
