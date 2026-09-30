// server/src/players/routers/PlayerListRouter.ts

import { Router } from "express";
import { PlayerListController } from "../controllers/PlayerListController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerListRouter(controller: PlayerListController) {
  const router = Router();

  router.get("/", requireAuth, controller.list);

  return router;
}
