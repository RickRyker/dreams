// server/src/combat/validators/CombatSnapshotValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const SnapshotParams = z.object({
  combatId: z.uuid(),
});

export const validateSnapshotParams = validateParams(SnapshotParams);
