// shared/zod/QuestSearchQuerySchema.ts

import { z } from "zod";

export const QuestSearchQuerySchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  createdById: z.string().optional(),
  requiresItemSlug: z.string().optional(),
  rewardsItemSlug: z.string().optional(),
  requiresQuestSlug: z.string().optional(),
});
