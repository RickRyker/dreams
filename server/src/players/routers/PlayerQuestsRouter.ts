// server/src/players/routers/PlayerQuestsRouter.ts

import { Router } from "express";
import { PlayerQuestsController } from "../controllers/PlayerQuestsController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerQuestsRouter(controller: PlayerQuestsController) {
  const router = Router();

  router.post("/:playerId/start", requireAuth, controller.startQuest);
  router.post("/:questId/complete", requireAuth, controller.completeQuest);
  router.get("/:playerId", requireAuth, controller.list);

  return router;
}
