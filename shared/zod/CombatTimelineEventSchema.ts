// shared/zod/CombatTimelineEventSchema.ts

import { z } from "zod";

export const CombatTimelineEventSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  participantId: z.string().nullable(),
  timestamp: z.number(),
  type: z.string(),
  label: z.string(),
  value: z.number().nullable(),
  telegraph: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
