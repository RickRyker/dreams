// shared/zod/MuteSchema.ts

import { z } from "zod";

export const MuteSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  reason: z.string(),
  expiresAt: z.number().nullable(),
  createdAt: z.number(),
  createdById: z.string(),
});
