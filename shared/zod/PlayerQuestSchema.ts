// shared/zod/PlayerQuestSchema.ts

import { z } from "zod";

export const PlayerQuestSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  questId: z.string(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  completed: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
