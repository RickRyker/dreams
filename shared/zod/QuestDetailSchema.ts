// shared/zod/QuestDetailSchema.ts

import {z} from "zod";
import {QuestRequirementItemSchema} from "@shared/zod/QuestRequirementItemSchema";
import {QuestRequirementSkillSchema} from "@shared/zod/QuestRequirementSkillSchema";
import {QuestRequirementQuestSchema} from "@shared/zod/QuestRequirementQuestSchema";
import {QuestRewardItemSchema} from "@shared/zod/QuestRewardItemSchema";
import {QuestRewardSkillSchema} from "@shared/zod/QuestRewardSkillSchema";
import {QuestRewardTitleSchema} from "@shared/zod/QuestRewardTitleSchema";

export const QuestDetailSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdById: z.string(),

  requirementLevel: z.number().optional(),
  requirementItems: z.array(QuestRequirementItemSchema),
  requirementSkills: z.array(QuestRequirementSkillSchema),
  requirementQuests: z.array(QuestRequirementQuestSchema),

  rewardExperience: z.number().optional(),
  rewardGold: z.number().optional(),
  rewardItems: z.array(QuestRewardItemSchema),
  rewardSkills: z.array(QuestRewardSkillSchema),
  rewardTitles: z.array(QuestRewardTitleSchema),
});
