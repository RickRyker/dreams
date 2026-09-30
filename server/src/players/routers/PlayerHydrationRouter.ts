// server/src/players/routers/PlayerHydrationRouter.ts

import { Router } from "express";
import { PlayerFullHydrationController } from "../controllers/PlayerFullHydrationController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerHydrationRouter(controller: PlayerFullHydrationController) {
  const router = Router();

  router.get("/:playerId", requireAuth, controller.hydrate);

  return router;
}
