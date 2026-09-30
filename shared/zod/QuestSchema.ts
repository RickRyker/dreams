// shared/zod/QuestSchema.ts

import { z } from "zod";

export const QuestSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  requirementLevel: z.number().optional(),
  createdById: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
