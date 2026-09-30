// shared/zod/PlayerClassSchema.ts

import { z } from "zod";

export const PlayerClassSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  classSlug: z.string(),
  level: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
