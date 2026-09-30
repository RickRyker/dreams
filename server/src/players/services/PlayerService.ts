// server/src/players/services/PlayerService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerHydrationAdapter } from "../adapters/PlayerHydrationAdapter";
import { PlayerSaveService } from "./PlayerSaveService";
import { PlayerCreationService } from "./PlayerCreationService";
import { PlayerDeleteService } from "./PlayerDeleteService";
import { PlayerMapper } from "../mappers/PlayerMapper";
import type { PlayerCreateCommand, PlayerProfileDomain, PlayerUpdateCommand } from "../domain/PlayerDomain";

type PlayerDtoLike = PlayerProfileDomain;

export class PlayerService {
  constructor(
    private readonly players: PlayerRepository,
    private readonly hydration: PlayerHydrationAdapter,
    private readonly save: PlayerSaveService,
    private readonly creation: PlayerCreationService,
    private readonly deletion: PlayerDeleteService
  ) {}

  // --- CRUD ---

  async create(command: PlayerCreateCommand): Promise<PlayerDtoLike> {
    return this.creation.create(command);
  }

  async get(playerId: string): Promise<PlayerDtoLike | null> {
    const model = await this.players.findById(playerId);
    return model ? PlayerMapper.fromPrisma(model) : null;
  }

  async update(playerId: string, dto: PlayerUpdateCommand): Promise<PlayerDtoLike> {
    return this.save.update(playerId, dto);
  }

  async delete(playerId: string): Promise<void> {
    return this.deletion.delete(playerId);
  }

  // --- Hydration ---

  async hydrate(playerId: string) {
    return this.hydration.hydrate(playerId);
  }

  // --- Save helpers ---

  async savePosition(playerId: string, x: number, y: number) {
    return this.save.updatePosition(playerId, x, y);
  }

  async saveMap(playerId: string, mapId: string | null) {
    return this.save.updateMap(playerId, mapId);
  }
}
