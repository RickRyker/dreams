// shared/zod/CombatThreatSchema.ts

import { z } from "zod";

export const CombatThreatSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  monsterId: z.string(),
  targetId: z.string(),
  value: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
