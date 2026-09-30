// server/src/players/services/PlayerDeleteService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";

export class PlayerDeleteService {
  constructor(private readonly players: PlayerRepository) {}

  async delete(playerId: string) {
    await this.players.delete(playerId);
  }
}
