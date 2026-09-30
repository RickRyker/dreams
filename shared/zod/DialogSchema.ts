// shared/zod/DialogSchema.ts

import { z } from "zod";

export const DialogSchema = z.object({
  id: z.string(),
  title: z.string(),
  displayMode: z.string(),
  chatBotId: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
