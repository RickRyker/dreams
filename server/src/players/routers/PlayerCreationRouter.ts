// server/src/players/routers/PlayerCreationRouter.ts

import { Router } from "express";
import { PlayerCreationController } from "../controllers/PlayerCreationController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerCreationRouter(controller: PlayerCreationController) {
  const router = Router();

  router.post("/", requireAuth, controller.create);

  return router;
}
