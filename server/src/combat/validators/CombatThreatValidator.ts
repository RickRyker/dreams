// server/src/combat/validators/CombatThreatValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const ThreatParams = z.object({
  combatId: z.uuid(),
});

export const validateThreatParams = validateParams(ThreatParams);
