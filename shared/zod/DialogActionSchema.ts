// shared/zod/DialogActionSchema.ts

import { z } from "zod";

export const DialogActionSchema = z.object({
  id: z.string(),
  pageId: z.string().nullable(),
  sequence: z.number(),
  action: z.string(),
  questId: z.string().nullable(),
  variable1: z.string().nullable(),
  variable2: z.string().nullable(),
  text: z.string().nullable(),
  numberAmt: z.number().nullable(),
  floatAmt: z.number().nullable(),
  slug: z.string().nullable(),
  skill: z.string().nullable(),
  mapId: z.string().nullable(),
  x: z.number().nullable(),
  y: z.number().nullable(),
  message: z.string().nullable(),
  sound: z.string().nullable(),
  music: z.string().nullable(),
  cutscene: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
