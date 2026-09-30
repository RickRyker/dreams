// shared/zod/RecipeSchema.ts

import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
