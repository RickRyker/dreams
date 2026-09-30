// server/src/players/routers/PlayerCombatStateRouter.ts

import { Router } from "express";
import { PlayerCombatStateController } from "../controllers/PlayerCombatStateController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerCombatStateRouter(controller: PlayerCombatStateController) {
  const router = Router();

  router.post("/:playerId/enter/:combatId", requireAuth, controller.enterCombat);
  router.post("/:playerId/leave", requireAuth, controller.leaveCombat);
  router.get("/:playerId/status", requireAuth, controller.status);

  return router;
}
