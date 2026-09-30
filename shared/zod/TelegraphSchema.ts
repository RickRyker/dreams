// shared/zod/TelegraphSchema.ts

import { z } from "zod";

export const TelegraphSchema = z.object({
  shape: z.enum(["CIRCLE", "CONE", "LINE"]),

  radius: z.number().nullable(),
  length: z.number().nullable(),
  width: z.number().nullable(),
  angleDeg: z.number().nullable(),

  casterId: z.string().nullable(),
  spellSlug: z.string().nullable(),

  endsAt: z.number().nullable(),
});
