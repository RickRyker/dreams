// shared/zod/PlayerTitleSchema.ts

import { z } from "zod";

export const PlayerTitleSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  titleId: z.string(),
  title: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
