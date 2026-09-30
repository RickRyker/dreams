// shared/zod/CastSpellRequestSchema.ts

import {z} from "zod";

export const CastSpellRequestSchema = z.object({
  combatId: z.string(),
  casterId: z.string(),
  spellSlug: z.string(),
  targetId: z.string().nullable().optional(),
});
