// shared/zod/PlayerQuestVariableSchema.ts

import { z } from "zod";

export const PlayerQuestVariableSchema = z.object({
  id: z.string(),
  playerQuestId: z.string(),
  name: z.string(),
  value: z.any(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
