// shared/zod/DialogPartSchema.ts

import { z } from "zod";

export const DialogPartSchema = z.object({
  id: z.string(),
  pageId: z.string().nullable(),
  sequence: z.number(),
  text: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
