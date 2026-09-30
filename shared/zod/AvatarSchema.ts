// shared/zod/AvatarSchema.ts

import { z } from "zod";

export const AvatarSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  name: z.string(),
  description: z.string(),
  s3Key: z.string(),
  isApproved: z.boolean(),
  isFree: z.boolean(),
  creatorId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
