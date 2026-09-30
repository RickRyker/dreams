// shared/zod/SessionSchema.ts

import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  sid: z.string(),
  data: z.string(),
  expiresAt: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
