// server/src/players/routers/PlayerEquipmentRouter.ts

import { Router } from "express";
import { PlayerEquipmentController } from "../controllers/PlayerEquipmentController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createPlayerEquipmentRouter(controller: PlayerEquipmentController) {
  const router = Router();

  router.post("/:playerId/equip", requireAuth, controller.equip);
  router.post("/:playerId/unequip/:equipmentId", requireAuth, controller.unequip);
  router.get("/:playerId", requireAuth, controller.list);

  return router;
}
