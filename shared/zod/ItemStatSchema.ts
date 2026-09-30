// shared/zod/ItemStatSchema.ts

import { z } from "zod";

export const ItemStatSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  statSlug: z.string(),
  value: z.number(),
});
