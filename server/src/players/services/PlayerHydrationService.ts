// server/src/players/services/PlayerHydrationService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerQuestService } from "./PlayerQuestService";
import { PlayerHydrationAdapter } from "../adapters/PlayerHydrationAdapter";
import { PlayerFullDto } from "shared";

export class PlayerHydrationService {
  constructor(
    private readonly quests: PlayerQuestService,
    private readonly adapter: PlayerHydrationAdapter,
  ) {}

  async hydrate(playerId: string): Promise<PlayerFullDto> {
    const base = await this.adapter.hydrateBasePlayer(playerId);
    try {
      const questState = await this.quests.hydratePlayerQuests(playerId);

      return {
        ...base,
        quests: [...questState.active, ...questState.completed],
      };
    } catch (error) {
      console.error("Failed to hydrate player quests", { playerId, error });
      return {
        ...base,
        quests: [],
      };
    }
  }
}
