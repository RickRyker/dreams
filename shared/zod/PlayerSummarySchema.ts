// shared/zod/PlayerSummarySchema.ts

import { z } from "zod";

export const PlayerSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string().nullable(),
  gender: z.string(),
  level: z.number(),
  class: z.string(),
  isDefault: z.boolean(),
});
