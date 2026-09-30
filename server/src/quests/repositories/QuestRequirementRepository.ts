// server/src/quests/repositories/QuestRequirementRepository.ts

import { prisma } from "../../db/client";

export class QuestRequirementRepository {
  async deleteAllForQuest(questId: string) {
    await prisma.questRequirementLevel.deleteMany({ where: { questId } });
    await prisma.questRequirementItem.deleteMany({ where: { questId } });
    await prisma.questRequirementSkill.deleteMany({ where: { questId } });
    await prisma.questRequirementQuest.deleteMany({ where: { questId } });
  }
}
