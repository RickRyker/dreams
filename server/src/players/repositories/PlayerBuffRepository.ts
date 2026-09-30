// server/src/players/repositories/PlayerBuffRepository.ts

import { prisma } from "../../db/client";
import { PlayerEffect, EffectType, ElementType } from "@prisma/client";

export class PlayerBuffRepository {
  async create(data: {
    playerId: string;
    type: EffectType;
    element?: ElementType;
    magnitude: number;
    expiresAt: Date | null;
    tickIntervalMs?: number | null;
    nextTickAt?: Date | null;
  }): Promise<PlayerEffect> {
    return prisma.playerEffect.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.playerEffect.delete({ where: { id } });
  }

  async clearExpired(playerId: string): Promise<number> {
    const result = await prisma.playerEffect.deleteMany({
      where: {
        playerId,
        expiresAt: { lt: new Date() },
      },
    });

    return result.count;
  }

  async list(playerId: string): Promise<PlayerEffect[]> {
    return prisma.playerEffect.findMany({
      where: { playerId },
    });
  }
}
