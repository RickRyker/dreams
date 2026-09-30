// server/src/modules/messaging/messaging.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { sendMessageSchema, moderateMessageSchema } from "./messaging.schema";
import { MessagingRepository } from "./messaging.repository";
import { MessagingMapper } from "./messaging.mapper";
import { MessagingService } from "./messaging.service";
import { MessagingController } from "./messaging.controller";

export const messagingRouter = Router();

const repository = new MessagingRepository();
const mapper = new MessagingMapper();
const service = new MessagingService(repository, mapper);
const controller = new MessagingController(service);

messagingRouter.use(authMiddleware);
messagingRouter.get("/:playerId", controller.getMessages);
messagingRouter.post("/send", (req, res) => {
  const parsed = sendMessageSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.sendMessage(req, res);
});
messagingRouter.post("/moderate", (req, res) => {
  const parsed = moderateMessageSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.moderateMessage(req, res);
});
