// shared/zod/AchievementSchema.ts

import { z } from "zod";

export const AchievementSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  points: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
