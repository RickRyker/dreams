// server/src/combat/routers/CombatReplayRouter.ts

import {Router} from "express";
import {CombatReplayController} from "../controllers/CombatReplayController";
import {validateReplayParams} from "../validators/CombatReplayValidator";

export function createCombatReplayRouter(): Router {
  const router = Router();
  const controller = new CombatReplayController();

  router.get("/:combatId/replay", validateReplayParams, controller.getReplay);
  router.delete("/:combatId/replay", validateReplayParams, controller.deleteReplay);

  return router;
}
