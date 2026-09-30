// shared/zod/MonsterSchema.ts

import { z } from "zod";

export const MonsterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.number(),
  element: z.string(),
  attackType: z.string(),
  baseHp: z.number(),
  baseMp: z.number(),
  baseStrength: z.number(),
  baseDexterity: z.number(),
  baseIntelligence: z.number(),
  baseCharisma: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
