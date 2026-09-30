// shared/zod/RegionalIngredientSchema.ts

import {z} from "zod";

export const RegionalIngredientSchema = z.object({
  regionId: z.string(),
  ingredient: z.string(),
  rarity: z.string(),
});
