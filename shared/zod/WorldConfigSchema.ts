// shared/zod/WorldConfigSchema.ts

import { z } from "zod";

export const WorldConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
