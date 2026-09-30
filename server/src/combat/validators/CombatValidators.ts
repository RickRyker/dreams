// server/src/combat/validators/CombatValidators.ts

import { RequestHandler } from "express";
import { z } from "zod";

export const CombatIdParamsSchema = z.object({
  combatId: z.string().uuid(),
});

export const ParticipantIdParamsSchema = z.object({
  participantId: z.string().uuid(),
});

export const validateCombatEventParams: RequestHandler = (req, _res, next) => {
  const result = CombatIdParamsSchema.safeParse(req.params);
  if (!result.success) {
    next(result.error);
    return;
  }

  next();
};
