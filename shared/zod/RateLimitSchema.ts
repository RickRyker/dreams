// shared/zod/RateLimitSchema.ts

import { z } from "zod";

export const RateLimitSchema = z.object({
  id: z.string(),
  ip: z.string(),
  endpoint: z.string(),
  timestamp: z.number(),
});
