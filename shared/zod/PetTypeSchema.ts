// shared/zod/PetTypeSchema.ts

import { z } from "zod";

export const PetTypeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  element: z.string(),
  baseHp: z.number(),
  baseMp: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
