// server/src/combat/validators/CombatReplayValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const ReplayParams = z.object({
  combatId: z.string().uuid(),
});

export const validateReplayParams = validateParams(ReplayParams);
