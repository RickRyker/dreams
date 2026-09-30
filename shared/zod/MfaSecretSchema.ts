// shared/zod/MfaSecretSchema.ts

import { z } from "zod";

export const MfaSecretSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  enabled: z.boolean(),
  createdAt: z.number(),
});
