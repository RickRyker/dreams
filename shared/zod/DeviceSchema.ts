// shared/zod/DeviceSchema.ts

import { z } from "zod";

export const DeviceSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  name: z.string(),
  lastIp: z.string(),
  trusted: z.boolean(),
  lastUsed: z.number(),
  createdAt: z.number(),
});
