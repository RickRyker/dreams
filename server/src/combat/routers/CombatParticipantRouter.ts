// server/src/combat/routers/CombatParticipantRouter.ts

import { Router } from "express";
import { CombatParticipantController } from "../controllers/CombatParticipantController";
import {validateParticipantId} from "../validators/CombatParticipantValidator";

export function createCombatParticipantRouter(): Router {
  const router = Router();
  const controller = new CombatParticipantController();

  router.get("/:combatId/participants", controller.listParticipants);
  router.get("/:participantId", validateParticipantId, controller.getParticipant);
  router.delete("/participant/:id", validateParticipantId, controller.deleteParticipant);
  router.delete("/:combatId/participants", controller.deleteParticipantsForCombat);

  return router;
}
