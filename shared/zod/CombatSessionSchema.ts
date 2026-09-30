// shared/zod/CombatSessionSchema.ts

import { z } from "zod";

export const CombatSessionSchema = z.object({
  id: z.string(),
  mapId: z.string(),
  turnPhase: z.string(),
  activeTurnId: z.string().nullable(),
  toHitBonus: z.number(),
  isActive: z.boolean(),
  startTime: z.number(),
  turnTimeoutSeconds: z.number(),
  roundNumber: z.number(),
  turnIndex: z.number(),
  lastTurnAt: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
