// shared/zod/ReplayEffectSchema.ts

import { z } from "zod";

export const ReplayEffectSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  magnitude: z.number(),
  element: z.string().optional(),
  expiresAt: z.string().nullable(),
  tickIntervalMs: z.number().optional(),
  nextTickAt: z.string().nullable().optional(),
});
