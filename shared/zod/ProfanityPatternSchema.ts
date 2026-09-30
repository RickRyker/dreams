// shared/zod/ProfanityPatternSchema.ts

import { z } from "zod";

export const ProfanityPatternSchema = z.object({
  id: z.string(),
  pattern: z.string(),
  severity: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
