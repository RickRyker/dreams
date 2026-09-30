// server/src/modules/skills/SkillsRepository.ts

import { Prisma } from '@prisma/client';
import { prisma } from "@prisma";
import { SkillDTO, PlayerSkillDTO, SkillLevelUpEvent } from './types.js';

export class SkillsRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listAllSkills(tx?: Prisma.TransactionClient): Promise<SkillDTO[]> {
    const client = tx || prisma;
    return client.skill.findMany() as Promise<SkillDTO[]>;
  }

  async getSkillById(skillId: string, tx?: Prisma.TransactionClient): Promise<SkillDTO | null> {
    const client = tx || prisma;
    return client.skill.findUnique({
      where: { id: skillId }
    }) as Promise<SkillDTO | null>;
  }

  async listPlayerSkills(playerId: string, tx?: Prisma.TransactionClient): Promise<PlayerSkillDTO[]> {
    const client = tx || prisma;
    return client.playerSkill.findMany({
      where: { playerId },
      include: {
        skill: true
      }
    }) as Promise<PlayerSkillDTO[]>;
  }

  async getPlayerSkill(
    playerId: string,
    skillId: string,
    tx?: Prisma.TransactionClient
  ) {
    const client = tx || prisma;
    return client.playerSkill.findUnique({
      where: { playerId_skillId: { playerId, skillId } }
    });
  }

  async addSkillXp(
    playerId: string,
    skillId: string,
    amount: number,
    tx?: Prisma.TransactionClient
  ): Promise<{ playerSkill: any; levelUpEvent?: SkillLevelUpEvent }> {
    const client = tx || prisma;

    const ps = await client.playerSkill.findUnique({
      where: { playerId_skillId: { playerId, skillId } }
    });

    if (!ps) {
      // Create skill entry if missing
      const created = await client.playerSkill.create({
        data: {
          playerId,
          skillId,
          points: amount,
          level: 1
        }
      });

      return { playerSkill: created };
    }

    const newXp = ps.points + amount;
    let newLevel = ps.level;
    let levelUpEvent: SkillLevelUpEvent | undefined;

    // Simple leveling formula — you can replace with your own
    const xpNeeded = ps.level * 100;
    if (newXp >= xpNeeded) {
      newLevel++;
      levelUpEvent = {
        playerId,
        skillId,
        newLevel,
        totalXp: newXp
      };
    }

    const updated = await client.playerSkill.update({
      where: { id: ps.id },
      data: {
        points: newXp,
        level: newLevel
      }
    });

    return { playerSkill: updated, levelUpEvent };
  }

  async initializePlayerSkill(
    playerId: string,
    skillId: string,
    tx?: Prisma.TransactionClient
  ) {
    const client = tx || prisma;
    return client.playerSkill.create({
      data: {
        playerId,
        skillId,
        points: 0,
        level: 1
      }
    });
  }
}
