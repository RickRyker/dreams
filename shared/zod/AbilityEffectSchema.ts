// shared/zod/AbilityEffectSchema.ts

import { z } from "zod";

export const AbilityEffectSchema = z.object({
  id: z.string(),
  abilityId: z.string(),
  type: z.string(),
  element: z.string().nullable(),
  magnitude: z.number(),
  durationMs: z.number().nullable(),
  tickIntervalMs: z.number().nullable(),
});
