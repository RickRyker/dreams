// server/src/quests/repositories/QuestDependencyRepository.ts

import { prisma } from "../../db/client";

export class QuestDependencyRepository {
  async listAll() {
    return prisma.questDependency.findMany({
      include: {
        quest: true,
        dependsOnQuest: true,
      },
    });
  }

  async listForQuest(questId: string) {
    return prisma.questDependency.findMany({
      where: { questId },
      include: { quest: true, dependsOnQuest: true },
    });
  }
}
