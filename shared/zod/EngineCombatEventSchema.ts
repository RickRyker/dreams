// shared/zod/EngineCombatEventSchema.ts


import {z} from "zod";

export const EngineCombatEventSchema = z.object({
  type: z.string(),
  timestamp: z.number(),
  sourceId: z.string().nullable().optional(),
  targetId: z.string().nullable().optional(),
  abilityId: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  // extend as needed
});
