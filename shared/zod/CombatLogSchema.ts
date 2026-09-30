// shared/zod/CombatLogSchema.ts

import { z } from "zod";
import { CombatLogEntrySchema } from "./CombatLogEntrySchema";

export const CombatLogSchema = z.object({
  combatId: z.string(),
  entries: z.array(CombatLogEntrySchema),
});
