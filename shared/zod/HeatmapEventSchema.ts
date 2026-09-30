// shared/zod/HeatmapEventSchema.ts

import { z } from "zod";

export const HeatmapEventSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  mapId: z.string(),
  x: z.number(),
  y: z.number(),
  eventType: z.string(),
  createdAt: z.number(),
});
