// server/src/players/services/PlayerSelectionService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerHydrationAdapter } from "../adapters/PlayerHydrationAdapter";

export class PlayerSelectionService {
  constructor(
    private readonly players: PlayerRepository,
    private readonly hydration: PlayerHydrationAdapter
  ) {}

  async loadDefaultCharacter(
    accountId: string
  ): Promise<Awaited<ReturnType<PlayerHydrationAdapter["hydrate"]>>> {
    const list = await this.players.listPlayers(accountId);
    if (list.length === 0) throw new Error("NO_CHARACTERS");

    const defaultPlayer = list.find((p) => p.isDefault) ?? list[0];
    return this.hydration.hydrate(defaultPlayer.id);
  }
}
