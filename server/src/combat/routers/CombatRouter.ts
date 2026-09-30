// server/src/combat/routers/CombatRouter.ts


import {Router} from "express";

import {createCombatCastRouter} from "./CombatCastRouter";
import {createCombatLootRouter} from "./CombatLootRouter";
import {createCombatParticipantRouter} from "./CombatParticipantRouter";
import {createCombatReplayRouter} from "./CombatReplayRouter";
import {createCombatSessionRouter} from "./CombatSessionRouter";
import {createCombatSnapshotRouter} from "./CombatSnapshotRouter";
import {createCombatThreatRouter} from "./CombatThreatRouter";
import {createCombatTimelineRouter} from "./CombatTimelineRouter";
import {createCombatEventRouter} from "./CombatEventRouter";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createCombatRouter(): Router {
  const router = Router();
  router.use(requireAuth);

  router.use("/cast", createCombatCastRouter());
  router.use("/loot", createCombatLootRouter());
  router.use("/participants", createCombatParticipantRouter());
  router.use("/replay", createCombatReplayRouter());
  router.use("/session", createCombatSessionRouter());
  router.use("/snapshot", createCombatSnapshotRouter());
  router.use("/threat", createCombatThreatRouter());
  router.use("/timeline", createCombatTimelineRouter());
  router.use("/events", createCombatEventRouter());

  return router;
}
