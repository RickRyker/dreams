// shared/zod/PlayerListSchema.ts

import { z } from "zod";

export const PlayerListSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number(),
  class: z.string(),
  isDefault: z.boolean(),
  createdAt: z.number(),
});
