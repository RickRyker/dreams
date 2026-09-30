// server/src/combat/routers/CombatLootRouter.ts

import { Router } from "express";
import { CombatLootController } from "../controllers/CombatLootController";
import {validateCombatLootParams} from "../validators/CombatLootValidator";

export function createCombatLootRouter(): Router {
  const router = Router();
  const controller = new CombatLootController();

  router.get("/loot/:id", validateCombatLootParams, controller.getLoot);
  router.get("/participant/:participantId/loot", validateCombatLootParams, controller.listByParticipant);
  router.delete("/loot/:id", validateCombatLootParams, controller.deleteLoot);

  return router;
}
