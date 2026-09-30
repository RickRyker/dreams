// server/src/modules/npc/npc.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { buyItemSchema, sellItemSchema } from "./npc.schema";
import { NpcRepository } from "./npc.repository";
import { NpcMapper } from "./npc.mapper";
import { NpcService } from "./npc.service";
import { NpcController } from "./npc.controller";

export const npcRouter = Router();

const repository = new NpcRepository();
const mapper = new NpcMapper();
const service = new NpcService(repository, mapper);
const controller = new NpcController(service);

npcRouter.use(authMiddleware);
npcRouter.get("/", controller.listNpcs);
npcRouter.get("/:npcId", controller.getNpc);
npcRouter.post("/:npcId/:playerId/buy", (req, res) => {
  const parsed = buyItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.buyItem(req, res);
});
npcRouter.post("/:playerId/sell", (req, res) => {
  const parsed = sellItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.sellItem(req, res);
});
