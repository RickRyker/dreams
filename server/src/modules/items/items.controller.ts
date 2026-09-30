// server/src/modules/items/items.controller.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ItemsService } from "./items.service";

export class ItemsController {
  constructor(private service: ItemsService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  listItems = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listItems());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getItem = async (req: Request, res: Response) => {
    try {
      const itemId = this.readParam(req.params, "itemId");
      return res.json(await this.service.getItemById(itemId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  listCategories = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listCategories());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  listRarities = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listRarities());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  listRecipes = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listRecipes());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  craftItem = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const { recipeId } = req.body;
      return res.json(await this.service.craftItem(playerId, recipeId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
