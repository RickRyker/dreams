// server/src/players/repositories/PlayerStatsRepository.ts

import { prisma } from "../../db/client";
import { Prisma, PlayerStats } from "@prisma/client";
import { STARTING_STATS } from "../presets/PlayerCreationPresets";

export class PlayerStatsRepository {
  async create(playerId: string, data: Omit<Prisma.PlayerStatsCreateInput, 'player'>): Promise<PlayerStats> {
    return prisma.playerStats.create({
      data: {
        ...data,
        player: { connect: { id: playerId } },
      },
    });
  }

  async update(playerId: string, data: Prisma.PlayerStatsUpdateInput): Promise<PlayerStats> {
    return prisma.playerStats.update({
      where: { playerId },
      data,
    });
  }

  async findByPlayerId(playerId: string): Promise<PlayerStats | null> {
    const existingStats = await prisma.playerStats.findUnique({
      where: { playerId },
    });

    if (existingStats) {
      return existingStats;
    }

    const player = await prisma.player.findUnique({
      where: { id: playerId },
      select: { id: true },
    });

    if (!player) {
      return null;
    }

    return this.create(playerId, STARTING_STATS);
  }
}
