// server/src/players/routers/PlayerSelectionRouter.ts

import { Router } from "express";
import { PlayerSelectionController } from "../controllers/PlayerSelectionController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerSelectionRouter(controller: PlayerSelectionController) {
  const router = Router();

  router.get("/default", requireAuth, controller.loadDefault);

  return router;
}
