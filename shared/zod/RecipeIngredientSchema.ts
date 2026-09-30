// shared/zod/RecipeIngredientSchema.ts

import { z } from "zod";

export const RecipeIngredientSchema = z.object({
  id: z.string(),
  recipeId: z.string(),
  itemId: z.string(),
  quantity: z.number(),
});
