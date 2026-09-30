// shared/zod/BanSchema.ts

import { z } from "zod";

export const BanSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  reason: z.string(),
  expiresAt: z.number().nullable(),
  createdById: z.string(),
  createdAt: z.number(),
});
