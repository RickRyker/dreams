// shared/zod/AccountAuthenticationSchema.ts

import { z } from "zod";

export const AccountAuthenticationSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  provider: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
