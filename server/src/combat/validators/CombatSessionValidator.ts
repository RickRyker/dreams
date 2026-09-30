// server/src/combat/validators/CombatSessionValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const CombatIdParams = z.object({
  combatId: z.uuid(),
});

export const validateCombatId = validateParams(CombatIdParams);
