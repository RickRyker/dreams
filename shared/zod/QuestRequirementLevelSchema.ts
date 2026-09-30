// shared/zod/QuestRequirementLevelSchema.ts


import {z} from "zod";

export const QuestRequirementLevelSchema = z.object({
  level: z.number().int().positive(),
});
