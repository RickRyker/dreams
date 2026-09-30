// server/src/combat/validators/CombatLootValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const CombatLootParams = z.object({
  participantId: z.string().uuid(),
});

export const validateCombatLootParams = validateParams(CombatLootParams);
