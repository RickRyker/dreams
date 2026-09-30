// shared/zod/DialogConditionSchema.ts

import { z } from "zod";

export const DialogConditionSchema = z.object({
  id: z.string(),
  partId: z.string().nullable(),
  actionId: z.string().nullable(),
  linkId: z.string().nullable(),
  questId: z.string(),
  variable: z.string(),
  operator: z.string(),
  value: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

