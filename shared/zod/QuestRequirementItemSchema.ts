// shared/zod/QuestRequirementItemSchema.ts

import { z } from "zod";

export const QuestRequirementItemSchema = z.object({
  itemSlug: z.string(),
  quantity: z.number().int().positive(),
});
