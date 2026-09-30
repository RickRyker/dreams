// shared/zod/EmailChangeTokenSchema.ts

import { z } from "zod";

export const EmailChangeTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  accountId: z.string(),
  email: z.email(),
  createdAt: z.number(),
  expiresAt: z.number(),
});
