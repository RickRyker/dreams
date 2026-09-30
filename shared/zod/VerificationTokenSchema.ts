// shared/zod/VerificationTokenSchema.ts

import { z } from "zod";

export const VerificationTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  accountId: z.string(),
  email: z.email(),
  expiresAt: z.number(),
  used: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
