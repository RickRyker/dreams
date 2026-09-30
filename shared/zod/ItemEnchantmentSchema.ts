// shared/zod/ItemEnchantmentSchema.ts

import { z } from "zod";

export const ItemEnchantmentSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  enchantmentSlug: z.string(),
  power: z.number(),
});
