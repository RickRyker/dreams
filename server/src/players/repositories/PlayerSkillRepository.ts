// server/src/players/repositories/PlayerSkillRepository.ts

import { prisma } from "@prisma";
import { PlayerSkill } from "@prisma/client";

export class PlayerSkillRepository {

  async incrementSkill(playerId: string, skillId: string): Promise<PlayerSkill> {
    return prisma.playerSkill.upsert({
      where: { playerId_skillId: { playerId, skillId } },
      update: { points: { increment: 1 } },
      create: { playerId, skillId, level: 1, points: 1 },
    });
  }

  async learnSkill(playerId: string, skillId: string): Promise<PlayerSkill> {
    return prisma.playerSkill.create({
      data: {
        playerId,
        skillId,
        level: 1,
        points: 0,
      },
    });
  }

  async list(playerId: string): Promise<PlayerSkill[]> {
    return prisma.playerSkill.findMany({ where: { playerId } });
  }
}
