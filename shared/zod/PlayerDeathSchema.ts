// shared/zod/PlayerDeathSchema.ts

import { z } from "zod";

export const PlayerDeathSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  level: z.number(),
  killedBy: z.string(),
  mapId: z.string(),
  x: z.number(),
  y: z.number(),
  timestamp: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
