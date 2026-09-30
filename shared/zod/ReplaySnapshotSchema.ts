// shared/zod/ReplaySnapshotSchema.ts

import { z } from "zod";
import { CombatParticipantSchema } from "./CombatParticipantSchema";

export const ReplaySnapshotSchema = z.object({
  combatId: z.string(),
  timestamp: z.number(),
  round: z.number(),
  turnIndex: z.number(),
  activeParticipantId: z.string().nullable(),
  activeTurnId: z.string().nullable(),
  participants: z.array(CombatParticipantSchema),
  effects: z.array(z.any()),
  timeline: z.array(z.any()),
  version: z.number(),
});
