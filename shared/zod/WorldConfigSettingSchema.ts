// shared/zod/WorldConfigSettingSchema.ts

import {z} from "zod";

export const WorldConfigSettingSchema = z.object({
  id: z.string(),
  worldConfigId: z.string(),
  name: z.string(),
  value: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
