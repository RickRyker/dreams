// server/src/quests/repositories/QuestRewardRepository.ts

import { prisma } from "../../db/client";

export class QuestRewardRepository {
  async deleteAllForQuest(questId: string) {
    await prisma.questRewardItem.deleteMany({ where: { questId } });
    await prisma.questRewardSkill.deleteMany({ where: { questId } });
    await prisma.questRewardTitle.deleteMany({ where: { questId } });
  }
}
