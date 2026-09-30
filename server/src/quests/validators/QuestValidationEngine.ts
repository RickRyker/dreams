// server/src/quests/validators/QuestValidationEngine.ts

import { prisma } from "../../db/client";
import { Quest, QuestRequirementItem, QuestRequirementSkill, QuestRequirementQuest } from "@prisma/client";

type ValidationResult = { ok: boolean; reason?: string };

export class QuestValidationEngine {

  async canStartQuest(playerId: string, quest: Quest): Promise<ValidationResult> {
    // 1. Check level
    const levelReq: any = await prisma.questRequirementLevel.findFirst({
      where: { questId: quest.id },
    });
    if (levelReq) {
      const player: any = await prisma.player.findUnique({
        where: { id: playerId },
        include: { stats: true},
      });
      if (!player || ((player.stats?.level ?? 0) < levelReq.level)) {
        return { ok: false, reason: "LEVEL_TOO_LOW" };
      }
    }

    // 2. Check required items
    const itemReqs: QuestRequirementItem[] = await prisma.questRequirementItem.findMany({
      where: { questId: quest.id },
    });
    // You’d check inventory here

    // 3. Check required skills
    const skillReqs: QuestRequirementSkill[] = await prisma.questRequirementSkill.findMany({
      where: { questId: quest.id },
    });
    // You’d check player skills here

    // 4. Check required quests
    const questReqs: QuestRequirementQuest[] = await prisma.questRequirementQuest.findMany({
      where: { questId: quest.id },
    });
    const completed = await prisma.playerQuest.findMany({
      where: {
        playerId,
        questId: { in: questReqs.map((q) => q.requiredQuestId) },
        status: "COMPLETED",
      },
    });
    if (completed.length !== questReqs.length) {
      return { ok: false, reason: "MISSING_PREREQUISITE_QUESTS" };
    }

    return { ok: true };
  }

  async canCompleteQuest(playerId: string, quest: Quest): Promise<ValidationResult> {
    // You can add additional checks here (variables, objectives, etc.)
    return { ok: true };
  }

  async validateQuestDefinition(questId: string): Promise<ValidationResult> {
    // Validate referenced items/skills/quests exist
    // Validate no circular dependencies via QuestDependency
    return { ok: true };
  }

}
