// shared/zod/PasswordResetTokenSchema.ts

import { z } from "zod";

export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  accountId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
});
