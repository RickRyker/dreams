// shared/zod/QuestRequirementSkillSchema.ts

import { z } from "zod";

export const QuestRequirementSkillSchema = z.object({
  skillSlug: z.string(),
  quantity: z.number().int().positive(),
});
