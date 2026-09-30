// shared/zod/DialogLinkSchema.ts

import { z } from "zod";

export const DialogLinkSchema = z.object({
  id: z.string(),
  pageId: z.string().nullable(),
  sequence: z.number().nullable(),
  dialogId: z.string().nullable(),
  mapId: z.string().nullable(),
  x: z.number().nullable(),
  y: z.number().nullable(),
  leave: z.boolean().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
