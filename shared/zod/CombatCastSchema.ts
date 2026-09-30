// shared/zod/CombatCastSchema.ts

import { z } from "zod";

export const CombatCastSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  casterId: z.string(),
  spellSlug: z.string(),
  startedAt: z.number(),
  endsAt: z.number(),
  status: z.string(),
  telegraphShape: z.string().nullable(),
  telegraphRadius: z.number().nullable(),
  telegraphAngle: z.number().nullable(),
  telegraphLength: z.number().nullable(),
  telegraphWidth: z.number().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
