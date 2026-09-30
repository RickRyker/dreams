// shared/zod/RegionSchema.ts

import { z } from "zod";

export const RegionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
