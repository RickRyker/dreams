// shared/zod/ItemSocketSchema.ts

import { z } from "zod";

export const ItemSocketSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  socketType: z.string(),
  gemId: z.string().nullable(),
});
