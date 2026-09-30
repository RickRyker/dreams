// server/src/players/services/PlayerListService.ts

import { Player, PlayerClass, PlayerStats, Class } from "@prisma/client";
import { PlayerRepository } from "../repositories/PlayerRepository";
import type { PlayerListItemDomain } from "../domain/PlayerDomain";

type PlayerListRepository = Pick<PlayerRepository, "listPlayers">;

type PlayerWithStatsClasses = Player & {
  stats: PlayerStats | null;
  classes: (PlayerClass & { class: Class })[];
};

export class PlayerListService {
  constructor(private readonly repo: PlayerListRepository) {}

  async list(accountId: string): Promise<PlayerListItemDomain[]> {
    const models = await this.repo.listPlayers(accountId) as PlayerWithStatsClasses[];

    return models.map(m => ({
      id: m.id,
      name: m.name ?? `Player-${m.id}`,
      level: m.stats?.level ?? 1,
      class: m.classes?.[0]?.class?.name ?? "No Class",
      isDefault: m.isDefault,
      createdAt: m.createdAt.getTime(),
    }));
  }
}
