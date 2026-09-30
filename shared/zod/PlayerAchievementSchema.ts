// shared/zod/PlayerAchievementSchema.ts

import { z } from "zod";

export const PlayerAchievementSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  achievementId: z.string(),
  unlockedAt: z.number(),
});
