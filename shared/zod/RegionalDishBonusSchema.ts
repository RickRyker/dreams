// shared/zod/RegionalDishBonusSchema.ts

import { z } from "zod";

export const RegionalDishBonusSchema = z.object({
  id: z.string(),
  regionalDishId: z.string(),
  bonusCategory: z.string(),
  value: z.number(),
  mythicBonus: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
