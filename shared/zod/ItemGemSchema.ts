// shared/zod/ItemGemSchema.ts

import { z } from "zod";

export const ItemGemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  gemSlug: z.string(),
  power: z.number(),
});
