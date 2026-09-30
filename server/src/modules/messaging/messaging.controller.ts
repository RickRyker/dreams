// server/src/modules/messaging/messaging.controller.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { MessagingService } from "./messaging.service";

export class MessagingController {
  constructor(private service: MessagingService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  getMessages = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getMessagesForPlayer(this.readParam(req.params, "playerId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  sendMessage = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.sendMessage(req.body));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  moderateMessage = async (req: Request, res: Response) => {
    try {
      const moderatorId = req.auth?.accountId ?? "";
      const { messageId, ...rest } = req.body;
      return res.json(await this.service.moderateMessage(moderatorId, messageId, rest));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
