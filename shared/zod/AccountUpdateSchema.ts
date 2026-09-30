// shared/zod/AccountUpdateSchema.ts

import { z } from "zod";

export const AccountUpdateSchema = z.object({
  email: z.email().optional(),
  emailVerifiedAt: z.number().nullable().optional(),
});
