// shared/zod/CombatLogEntrySchema.ts


import {z} from "zod";

export const CombatLogEntrySchema = z.object({
  id: z.string(),
  combatId: z.string(),
  seq: z.number(),
  type: z.string(),
  actorId: z.string().nullable(),
  actorType: z.string().nullable(),
  targetId: z.string().nullable(),
  message: z.string(),
  data: z.any().nullable(),
  createdAt: z.date(),
});
