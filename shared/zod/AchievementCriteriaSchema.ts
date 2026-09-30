// shared/zod/AchievementCriteriaSchema.ts

import { z } from "zod";

export const AchievementCriteriaSchema = z.object({
  id: z.string(),
  achievementId: z.string(),
  criteriaType: z.string(),
  value: z.string(),
});
