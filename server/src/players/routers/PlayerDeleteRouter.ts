// server/src/players/routers/PlayerDeleteRouter.ts

import { Router } from "express";
import { PlayerDeleteController } from "../controllers/PlayerDeleteController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerDeleteRouter(controller: PlayerDeleteController) {
  const router = Router();

  router.delete("/:playerId", requireAuth, controller.delete);

  return router;
}
