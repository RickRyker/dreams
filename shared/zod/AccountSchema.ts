// shared/zod/AccountSchema.ts

import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  emailVerifiedAt: z.number().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
