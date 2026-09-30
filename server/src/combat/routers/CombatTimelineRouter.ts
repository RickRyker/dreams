// server/src/combat/routers/CombatTimelineRouter.ts

import { Router } from "express";
import { CombatTimelineController } from "../controllers/CombatTimelineController";
import {validateTimelineParams} from "../validators/CombatTimelineEventValidator";

export function createCombatTimelineRouter(): Router {
  const router = Router();
  const controller = new CombatTimelineController();

  router.get("/:combatId/timeline", validateTimelineParams, controller.getTimeline);
  router.delete("/:combatId/timeline", validateTimelineParams, controller.resetTimeline);

  return router;
}
