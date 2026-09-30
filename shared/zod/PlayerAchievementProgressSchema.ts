// shared/zod/PlayerAchievementProgressSchema.ts

import { z } from "zod";

export const PlayerAchievementProgressSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  achievementId: z.string(),
  progress: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
