// shared/zod/ReplayEventSchema.ts

import { z } from "zod";

export const ReplayEventSchema = z.object({
  id: z.string(),
  combatId: z.string(),
  participantId: z.string().nullable().optional(),
  timestamp: z.number(),
  type: z.enum([
    "damage",
    "heal",
    "death",
    "cast",
    "interrupt",
    "telegraph",
    "roundStart",
    "turnStart",
  ]),
  label: z.string().optional(),
  value: z.number().nullable().optional(),
  telegraph: z.any().nullable().optional(),
});
