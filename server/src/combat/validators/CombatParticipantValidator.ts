// server/src/combat/validators/CombatParticipantValidator.ts

import { z } from "zod";
import { validateParams } from "../../middleware/validate";

export const ParticipantIdParams = z.object({
  participantId: z.uuid(),
});

export const validateParticipantId = validateParams(ParticipantIdParams);
