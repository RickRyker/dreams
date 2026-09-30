// server/src/combat/routers/CombatCastRouter.ts

import {Router} from "express";
import {CombatCastController} from "../controllers/CombatCastController";
import {validateCastSpell} from "../validators/CombatCastValidator";

export function createCombatCastRouter(): Router {
  const router = Router();
  const controller = new CombatCastController();

  router.get("/cast/:id", controller.getCast);
  router.get("/:combatId/casts", controller.listByCombat);
  router.get("/caster/:casterId/casts", controller.listByCaster);
  router.delete("/cast/:id", controller.deleteCast);
  router.post("/cast", validateCastSpell, controller.castSpell);

  return router;
}
