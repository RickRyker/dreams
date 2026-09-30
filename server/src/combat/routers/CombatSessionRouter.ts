// server/src/combat/routers/CombatSessionRouter.ts

import { Router } from "express";
import { CombatSessionController } from "../controllers/CombatSessionController";
import {validateCombatId} from "../validators/CombatSessionValidator";

export function createCombatSessionRouter(): Router {
  const router = Router();
  const controller = new CombatSessionController();

  router.get("/session/:id", validateCombatId, controller.getSession);
  router.delete("/session/:id", validateCombatId, controller.deleteSession);

  return router;
}
