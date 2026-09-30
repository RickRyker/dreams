// shared/zod/PlayerSkillSchema.ts

import { z } from "zod";

export const PlayerSkillSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  skillSlug: z.string(),
  level: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
