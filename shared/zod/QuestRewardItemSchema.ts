// shared/zod/QuestRewardItemSchema.ts

import { z } from "zod";

export const QuestRewardItemSchema = z.object({
  itemSlug: z.string(),
  quantity: z.number().int().positive(),
});
