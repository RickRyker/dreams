// server/src/players/routers/PlayerMovementRouter.ts

import { Router } from "express";
import { PlayerMovementController } from "../controllers/PlayerMovementController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerMovementRouter(controller: PlayerMovementController) {
  const router = Router();

  router.post("/:playerId/move", requireAuth, controller.move);
  router.post("/:playerId/change-zone", requireAuth, controller.changeZone);
  router.post("/:playerId/move-delta", requireAuth, controller.moveDelta);

  return router;
}
