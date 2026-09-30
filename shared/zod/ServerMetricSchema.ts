// shared/zod/ServerMetricSchema.ts

import { z } from "zod";

export const ServerMetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  tags: z.string().nullable(),
  recordedAt: z.number(),
});
