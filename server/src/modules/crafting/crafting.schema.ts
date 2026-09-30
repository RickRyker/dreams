// server/src/modules/crafting/crafting.schema.ts

import { z } from 'zod';

export const craftItemSchema = z.object({
  recipeId: z.string()
});

export const learnRecipeSchema = z.object({
  recipeId: z.string()
});
