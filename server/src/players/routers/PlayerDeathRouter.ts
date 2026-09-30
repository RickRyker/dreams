// server/src/players/routers/PlayerDeathRouter.ts

import { Router } from "express";
import { PlayerDeathController } from "../controllers/PlayerDeathController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerDeathRouter(controller: PlayerDeathController) {
  const router = Router();

  router.post("/:playerId/record", requireAuth, controller.record);
  router.post("/:playerId/respawn", requireAuth, controller.respawn);
  router.get("/:playerId/history", requireAuth, controller.history);

  return router;
}
