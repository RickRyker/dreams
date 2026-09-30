// shared/zod/CombatReplaySchema.ts

import { z } from "zod";

export const CombatReplaySchema = z.object({
  id: z.string(),
  combatId: z.string(),
  source: z.string(),
  raw: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
