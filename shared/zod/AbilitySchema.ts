// shared/zod/AbilitySchema.ts

import { z } from "zod";

export const AbilitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  element: z.string().nullable(),
  effectType: z.string().nullable(),
  baseDamage: z.number().nullable(),
  baseHeal: z.number().nullable(),
  manaCost: z.number(),
  castTimeMs: z.number(),
  cooldownMs: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
