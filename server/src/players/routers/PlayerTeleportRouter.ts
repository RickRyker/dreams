// server/src/players/routers/PlayerTeleportRouter.ts

import { Router } from "express";
import { PlayerTeleportController } from "../controllers/PlayerTeleportController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerTeleportRouter(controller: PlayerTeleportController) {
  const router = Router();

  router.post("/:playerId/teleport", requireAuth, controller.teleport);

  return router;
}
