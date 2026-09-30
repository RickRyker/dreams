// server/src/guilds/routers/GuildLogsRouter.ts


import { Router } from "express";
import { GuildLogsController } from "../controllers/GuildLogsController";

export function createGuildLogsRouter(controller: GuildLogsController) {
  const router: Router = Router({ mergeParams: true });

  router.get("/", controller.listLogs);

  return router;
}
