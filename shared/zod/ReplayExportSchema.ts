// shared/zod/ReplayExportSchema.ts

import { z } from "zod";
import { ReplayEventSchema } from "./ReplayEventSchema";
import { CombatSnapshotSchema } from "./CombatSnapshotSchema";

export const ReplayExportSchema = z.object({
  combatId: z.string(),
  createdAt: z.string(),
  source: z.enum(["live", "imported", "simulation"]),
  snapshots: z.array(CombatSnapshotSchema),
  events: z.array(ReplayEventSchema),
});
