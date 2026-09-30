// server/src/guilds/routers/GuildMemberRouter.ts


import { Router } from "express";
import { GuildMemberController } from "../controllers/GuildMemberController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createGuildMemberRouter(controller: GuildMemberController) {
  const router = Router({ mergeParams: true });

  router.post("/:memberId/remove", requireAuth, controller.removeMember);
  router.post("/", requireAuth, controller.addMember);
  router.post("/promote", requireAuth, controller.promoteMember);

  return router;
}
