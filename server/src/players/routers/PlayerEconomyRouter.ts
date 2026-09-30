// server/src/players/routers/PlayerEconomyRouter.ts

import { Router } from "express";
import { PlayerEconomyController } from "../controllers/PlayerEconomyController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerEconomyRouter(controller: PlayerEconomyController) {
  const router = Router();

  router.post("/:playerId/add-gold", requireAuth, controller.addGold);
  router.post("/:playerId/remove-gold", requireAuth, controller.removeGold);
  router.post("/:fromId/transfer/:toId", requireAuth, controller.transferGold);

  return router;
}
