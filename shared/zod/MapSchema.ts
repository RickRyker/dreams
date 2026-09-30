// shared/zod/MapSchema.ts

import { z } from "zod";

export const MapSchema = z.object({
  id: z.string(),
  name: z.string(),
  width: z.number(),
  height: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
