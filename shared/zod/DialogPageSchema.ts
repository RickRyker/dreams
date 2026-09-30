// shared/zod/DialogPageSchema.ts

import { z } from "zod";

export const DialogPageSchema = z.object({
  id: z.string(),
  dialogId: z.string(),
  sequence: z.number(),
  imageUrl: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
