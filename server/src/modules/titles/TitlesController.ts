// server/src/modules/titles/TitlesController.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { TitlesService } from "./TitlesService.js";
import { EquipTitleRequest } from "./types.js";

export class TitlesController {
  constructor(private service: TitlesService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  async listTitles(_req: Request, res: Response) {
    try {
      return res.json(await this.service.listAllTitles());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async listPlayerTitles(req: Request, res: Response) {
    try {
      return res.json(await this.service.listPlayerTitles(this.readParam(req.params, "playerId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async awardTitle(req: Request, res: Response) {
    try {
      const body = req.body as EquipTitleRequest;
      return res.status(201).json(
        await this.service.awardTitleToPlayer(this.readParam(req.params, "playerId"), body.titleId)
      );
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async equipTitle(req: Request, res: Response) {
    try {
      const body = req.body as EquipTitleRequest;
      return res.json(await this.service.equipTitle(this.readParam(req.params, "playerId"), body.titleId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async unequipTitle(req: Request, res: Response) {
    try {
      return res.json(await this.service.unequipTitle(this.readParam(req.params, "playerId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCurrentTitle(req: Request, res: Response) {
    try {
      const title = await this.service.getCurrentTitle(this.readParam(req.params, "playerId"));
      return res.json({ title });
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
