// shared/zod/CombatSnapshotSchema.ts

import { z } from "zod";
import { EngineCombatEventSchema } from "./EngineCombatEventSchema";
import { EngineCombatResolutionSchema } from "./EngineCombatResolutionSchema";
import { CombatEntitySnapshotSchema } from "./CombatEntitySnapshotSchema";

export const CombatSnapshotSchema = z.object({
  combatId: z.string(),
  timestamp: z.number(),
  eventType: z.string(),
  event: EngineCombatEventSchema,
  resolution: EngineCombatResolutionSchema.optional(),
  participants: z.array(CombatEntitySnapshotSchema),
  effects: z.array(z.any()).default([]),
  createdAt: z.number().optional(),
});
