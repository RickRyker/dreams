// server/src/modules/skills/SkillsController.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { SkillsService } from "./SkillsService.js";
import { AddSkillXpRequest } from "./types.js";

export class SkillsController {
  constructor(private service: SkillsService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  async listSkills(_req: Request, res: Response) {
    try {
      return res.json(await this.service.listAllSkills());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSkillById(req: Request, res: Response) {
    try {
      return res.json(await this.service.getSkillById(this.readParam(req.params, "skillId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async listPlayerSkills(req: Request, res: Response) {
    try {
      return res.json(await this.service.listPlayerSkills(this.readParam(req.params, "playerId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addSkillXp(req: Request, res: Response) {
    try {
      const body = req.body as AddSkillXpRequest;
      return res.status(200).json(
        await this.service.addSkillXp(this.readParam(req.params, "playerId"), body.skillId, body.amount)
      );
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async initializePlayerSkills(req: Request, res: Response) {
    try {
      const allSkills = await this.service.listAllSkills();
      const result = await this.service.initializePlayerSkills(
        this.readParam(req.params, "playerId"),
        allSkills.map((s) => s.id)
      );
      return res.status(201).json({ message: `Initialized ${result.length} skills for player`, count: result.length });
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
