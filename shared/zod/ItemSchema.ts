// shared/zod/ItemSchema.ts

import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  quality: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
