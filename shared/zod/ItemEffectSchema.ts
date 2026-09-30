// shared/zod/ItemEffectSchema.ts

import { z } from "zod";

export const ItemEffectSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  effectSlug: z.string(),
  magnitude: z.number(),
});
