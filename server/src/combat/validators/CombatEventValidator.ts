// server/src/combat/validators/CombatEventValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const EventParams = z.object({
  combatId: z.uuid(),
});

export const validateCombatEventParams = validateParams(EventParams);
