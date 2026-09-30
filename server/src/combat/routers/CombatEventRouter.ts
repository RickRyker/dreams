// server/src/combat/routers/CombatEventRouter.ts


import {Router} from "express";
import {CombatEventController} from "../controllers/CombatEventController";
import {validateCombatEventParams} from "../validators/CombatValidators";

export function createCombatEventRouter(): Router {
  const router = Router();
  const controller = new CombatEventController();

  router.get("/:combatId", validateCombatEventParams, controller.listByCombat);
  router.delete("/:combatId", validateCombatEventParams, controller.deleteByCombat);

  return router;
}
