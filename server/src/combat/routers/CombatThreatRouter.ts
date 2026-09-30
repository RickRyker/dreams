// server/src/combat/routers/CombatThreatRouter.ts

import {Router} from "express";
import {CombatThreatController} from "../controllers/CombatThreatController";
import {validateThreatParams} from "../validators/CombatThreatValidator";

export function createCombatThreatRouter(): Router {
  const router = Router();
  const controller = new CombatThreatController();

  router.get("/threat/:id", validateThreatParams, controller.getThreat);
  router.get("/:combatId/threats", controller.listByCombat);
  router.get("/monster/:monsterId/threats", controller.listByMonster);
  router.get("/target/:targetId/threats", controller.listByTarget);
  router.delete("/threat/:id", validateThreatParams, controller.deleteThreat);

  return router;
}
