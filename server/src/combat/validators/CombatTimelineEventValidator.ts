// server/src/combat/validators/CombatTimelineEventValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const TimelineParams = z.object({
  combatId: z.uuid(),
});

export const validateTimelineParams = validateParams(TimelineParams);
