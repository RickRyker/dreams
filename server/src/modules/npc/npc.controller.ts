// server/src/modules/npc/npc.controller.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { NpcService } from "./npc.service";

export class NpcController {
  constructor(private service: NpcService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  listNpcs = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listNpcs());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getNpc = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getNpcById(this.readParam(req.params, "npcId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  buyItem = async (req: Request, res: Response) => {
    try {
      const npcId = this.readParam(req.params, "npcId");
      const playerId = this.readParam(req.params, "playerId");
      const { itemId, quantity } = req.body;
      return res.json(await this.service.buyItem(playerId, npcId, itemId, quantity));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  sellItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { inventoryItemId, quantity } = req.body;
      return res.json(await this.service.sellItem(playerId, inventoryItemId, quantity));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
