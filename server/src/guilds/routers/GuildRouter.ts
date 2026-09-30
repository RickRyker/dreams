// server/src/guilds/routers/GuildRouter.ts


import { Router } from "express";
import { requireAuth } from "../../middleware/AuthMiddleware";

import { GuildRepository } from "../repositories/GuildRepository";
import { GuildService } from "../services/GuildService";

import { GuildController } from "../controllers/GuildController";
import { GuildMemberController } from "../controllers/GuildMemberController";
import { GuildTreasuryController } from "../controllers/GuildTreasuryController";
import { GuildLogsController } from "../controllers/GuildLogsController";

import { createGuildMemberRouter } from "./GuildMemberRouter";
import { createGuildTreasuryRouter } from "./GuildTreasuryRouter";
import { createGuildLogsRouter } from "./GuildLogsRouter";

export function createGuildRouter() {
  const router = Router();

  const repo = new GuildRepository();
  const svc = new GuildService(repo);

  const guild = new GuildController(svc);
  const members = new GuildMemberController(svc);
  const treasury = new GuildTreasuryController(svc);
  const logs = new GuildLogsController(svc);

  router.post("/", requireAuth, guild.createGuild);
  router.get("/:guildId", requireAuth, guild.getGuild);

  router.use("/:guildId/members", requireAuth, createGuildMemberRouter(members));
  router.use("/:guildId/treasury", requireAuth, createGuildTreasuryRouter(treasury));
  router.use("/:guildId/logs", requireAuth, createGuildLogsRouter(logs));

  return router;
}
