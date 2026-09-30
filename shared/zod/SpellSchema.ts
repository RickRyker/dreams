// shared/zod/SpellSchema.ts

import { z } from "zod";

export const SpellSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  minLevel: z.number(),
  element: z.string(),
  skillType: z.string().nullable(),
  attackType: z.string(),
  manaCost: z.number(),
  cooldown: z.number(),
  castTime: z.number(),
  range: z.number(),
  areaOfEffect: z.number(),
  effect: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
