// server/src/modules/items/items.schema.ts

import { z } from 'zod';

export const craftItemSchema = z.object({
  recipeId: z.string()
});
