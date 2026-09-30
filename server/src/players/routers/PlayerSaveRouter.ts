// server/src/players/routers/PlayerSaveRouter.ts

import { Router } from "express";
import { PlayerSaveController } from "../controllers/PlayerSaveController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerSaveRouter(controller: PlayerSaveController) {
  const router = Router();

  router.post("/:playerId", requireAuth, controller.save);

  return router;
}
