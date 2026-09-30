// shared/zod/RegionalDishSchema.ts

import { z } from "zod";

export const RegionalDishSchema = z.object({
  id: z.string(),
  regionId: z.string(),
  dish: z.string(),
  rarity: z.string(),
  bonusDuration: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
