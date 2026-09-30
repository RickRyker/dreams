// shared/zod/QuestEditorPayloadSchema.ts

import { z } from "zod";

export const QuestEditorPayloadSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),

  requirementLevel: z.number().optional(),

  requirementItems: z.array(
    z.object({
      itemSlug: z.string(),
      quantity: z.number().int().positive(),
    })
  ),

  requirementSkills: z.array(
    z.object({
      skillSlug: z.string(),
      quantity: z.number().int().positive(),
    })
  ),

  requirementQuests: z.array(
    z.object({
      requiredQuestSlug: z.string(),
    })
  ),

  rewardExperience: z.number().optional(),
  rewardGold: z.number().optional(),

  rewardItems: z.array(
    z.object({
      itemSlug: z.string(),
      quantity: z.number().int().positive(),
    })
  ),

  rewardSkills: z.array(
    z.object({
      skillSlug: z.string(),
    })
  ),

  rewardTitles: z.array(
    z.object({
      titleSlug: z.string(),
    })
  ),
});
