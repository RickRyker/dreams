// server/src/combat/routers/CombatSnapshotRouter.ts

import {Router} from "express";
import {CombatSnapshotController} from "../controllers/CombatSnapshotController";
import {validateSnapshotParams} from "../validators/CombatSnapshotValidator";

export function createCombatSnapshotRouter(): Router {
  const router = Router();
  const controller = new CombatSnapshotController();

  router.get("/:combatId/snapshots", validateSnapshotParams, controller.listSnapshots);
  router.get("/snapshot/:id", validateSnapshotParams, controller.getSnapshot);
  router.delete("/:combatId/snapshots", validateSnapshotParams, controller.deleteSnapshots);

  return router;
}
