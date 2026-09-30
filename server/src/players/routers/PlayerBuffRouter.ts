// server/src/players/routers/PlayerBuffRouter.ts

import { Router } from "express";
import { PlayerBuffController } from "../controllers/PlayerBuffController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerBuffRouter(controller: PlayerBuffController) {
  const router = Router();

  router.post("/:playerId/apply", requireAuth, controller.apply);
  router.delete("/effect/:effectId", requireAuth, controller.remove);
  router.get("/:playerId", requireAuth, controller.list);

  return router;
}
