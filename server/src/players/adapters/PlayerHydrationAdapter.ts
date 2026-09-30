// server/src/players/adapters/PlayerHydrationAdapter.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerFullDto } from "shared";
import {PlayerStatsMapper} from "../mappers/PlayerStatsMapper";
import { AppError } from "../../errors/AppError";

export class PlayerHydrationAdapter {
  constructor(private readonly players: PlayerRepository) {}

  async hydrate(playerId: string): Promise<PlayerFullDto> {
    return this.hydrateBasePlayer(playerId);
  }

  async hydrateBasePlayer(playerId: string): Promise<PlayerFullDto> {
    const p: any = await this.players.findFullPlayer(playerId);
    if (!p) {
      throw new AppError("PLAYER_NOT_FOUND", 404);
    }

    if (!p.mapId) {
      const tutorialSpawn = await this.players.findTutorialSpawn();
      if (tutorialSpawn) {
        await this.players.update(p.id, {
          mapId: tutorialSpawn.mapId,
          x: tutorialSpawn.x,
          y: tutorialSpawn.y,
        });
        p.mapId = tutorialSpawn.mapId;
        p.x = tutorialSpawn.x;
        p.y = tutorialSpawn.y;
      }
    }

    return {
      id: p.id,
      name: p.name,
      title: p.title ?? null,
      gender: p.gender ?? "",
      level: p.stats?.level ?? 1,
      class: p.class ?? "",
      mapId: p.mapId ?? null,
      x: p.x ?? 0,
      y: p.y ?? 0,
      isDefault: p.isDefault ?? false,
      stats: PlayerStatsMapper.toDto(p.stats),
      equipment: p.equipment ?? [],
      inventory: p.inventory ?? [],
      spells: p.spells ?? [],
      skills: p.skills ?? [],
      quests: [],
    };
  }
}
