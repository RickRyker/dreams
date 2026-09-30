// server/src/modules/inventory/inventory.controller.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { InventoryService } from "./inventory.service";

export class InventoryController {
  constructor(private service: InventoryService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  listInventory = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      return res.json(await this.service.getPlayerInventory(playerId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  listEquipment = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      return res.json(await this.service.getPlayerEquipment(playerId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  equipItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { inventoryItemId, slot } = req.body;
      return res.json(await this.service.equipItem(playerId, inventoryItemId, slot));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  unequipItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { slot } = req.body;
      return res.json(await this.service.unequipItem(playerId, slot));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  moveItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { inventoryItemId, targetContainerId, targetPlayerId, quantity } = req.body;
      return res.json(await this.service.moveItem(playerId, inventoryItemId, targetContainerId, targetPlayerId, quantity));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  dropItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { inventoryItemId, quantity } = req.body;
      return res.json(await this.service.dropItem(playerId, inventoryItemId, quantity));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  pickupItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { containerId, inventoryItemId, quantity } = req.body;
      return res.json(await this.service.pickupItem(playerId, containerId, inventoryItemId, quantity));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
