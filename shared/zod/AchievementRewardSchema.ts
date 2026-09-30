// shared/zod/AchievementRewardSchema.ts

import { z } from "zod";

export const AchievementRewardSchema = z.object({
  id: z.string(),
  achievementId: z.string(),
  rewardType: z.string(),
  itemId: z.string().nullable(),
  amount: z.number().nullable(),
  titleId: z.string().nullable(),
});
