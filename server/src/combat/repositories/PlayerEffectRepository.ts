// server/src/combat/repositories/PlayerEffectRepository.ts

import { PrismaClient, PlayerEffect, Prisma } from "@prisma/client";
import { prisma } from "@prisma";

export class PlayerEffectRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async listByPlayer(playerId: string): Promise<PlayerEffect[]> {
    return this.db.playerEffect.findMany({
      where: { playerId },
      orderBy: { createdAt: "asc" },
    });
  }

  async create(
    data: Prisma.PlayerEffectUncheckedCreateInput
  ): Promise<PlayerEffect> {
    return this.db.playerEffect.create({ data });
  }

  async deleteByPlayer(playerId: string): Promise<void> {
    await this.db.playerEffect.deleteMany({ where: { playerId } });
  }
}
