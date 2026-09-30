// server/src/players/repositories/PlayerQuestRepository.ts

import { prisma } from "../../db/client";

export class PlayerQuestRepository {

  async getPlayerQuests(playerId: string) {
    return prisma.playerQuest.findMany({
      where: { playerId },
      include: {
        quest: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    });
  }

  async getPlayerQuest(playerId: string, questId: string) {
    return prisma.playerQuest.findUnique({
      where: { playerId_questId: { playerId, questId } },
      include: {
        quest: {
          select: {
            id: true, slug: true, name: true,
            rewards: true,
          },
        },
      },
    });
  }

  async startQuest(playerId: string, questId: string) {
    return prisma.playerQuest.create({
      data: {
        playerId,
        questId,
        status: "IN_PROGRESS",
      },
      include: {
        quest: { select: { id: true, slug: true, name: true } },
      },
    });
  }

  async completeQuest(playerId: string, questId: string) {
    return prisma.playerQuest.update({
      where: { playerId_questId: { playerId, questId } },
      data: {
        status: "COMPLETED",
        completed: true,
      },
      include: {
        quest: { select: { id: true, slug: true, name: true } },
      },
    });
  }

}
