// shared/zod/RefreshTokenSchema.ts

import { z } from "zod";

export const RefreshTokenSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
});
