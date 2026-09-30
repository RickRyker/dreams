// server/src/quests/mappers/QuestMapper.ts

import type {
  Quest,
  QuestRequirementItem,
  QuestRequirementLevel,
  QuestRequirementSkill,
  QuestRequirementQuest,
  QuestRewardItem,
  QuestRewardSkill,
  QuestRewardTitle,
} from "@prisma/client";

import { QuestDetailDto, QuestDto } from "shared";

export type QuestWithRelations = Quest & {
  requirementLevels: QuestRequirementLevel[];
  requirementItems: QuestRequirementItem[];
  requirementSkills: QuestRequirementSkill[];
  requirementQuests: (QuestRequirementQuest & { requiredQuest: Quest })[];
  rewardItems: QuestRewardItem[];
  rewardSkills: QuestRewardSkill[];
  rewardTitles: QuestRewardTitle[];
};

export class QuestMapper {
  static toSummaryDto(q: Quest): QuestDto {
    return {
      id: q.id,
      slug: q.slug,
      name: q.name,
      description: q.description,
      requirementLevel: q.requirementLevel ?? undefined,
      createdById: q.createdById,
      createdAt: q.createdAt.getTime(),
      updatedAt: q.updatedAt.getTime(),
    };
  }

  static toDetailDto(q: QuestWithRelations): QuestDetailDto {
    return {
      id: q.id,
      slug: q.slug,
      name: q.name,
      description: q.description,
      createdById: q.createdById,
      requirementLevel: q.requirementLevel ?? undefined,
      requirementItems: q.requirementItems.map((ri) => ({
        itemSlug: ri.itemSlug,
        quantity: ri.quantity,
      })),
      requirementSkills: q.requirementSkills.map((rs) => ({
        skillSlug: rs.skillSlug,
        quantity: rs.quantity,
      })),
      requirementQuests: q.requirementQuests.map((rq) => ({
        requiredQuestSlug: rq.requiredQuest.slug,
      })),
      rewardItems: q.rewardItems.map((ri) => ({
        itemSlug: ri.itemSlug,
        quantity: ri.quantity,
      })),
      rewardSkills: q.rewardSkills.map((rs) => ({
        skillSlug: rs.skillSlug,
        quantity: 1,
      })),
      rewardTitles: q.rewardTitles.map((rt) => ({
        titleSlug: rt.titleSlug,
      })),
      rewardGold: (q as any).rewardGold ?? undefined,
    };
  }
}
