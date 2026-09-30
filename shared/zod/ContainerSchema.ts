// shared/zod/ContainerSchema.ts

import { z } from "zod";

export const ContainerSchema = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.number(),
  slots: z.number(),
  isLocked: z.boolean(),
  ownerId: z.string().nullable(),
  mapId: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
