// server/src/modules/spells/SpellsController.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { SpellsService } from "./SpellsService.js";
import { LearnSpellRequest } from "./types.js";

export class SpellsController {
  constructor(private service: SpellsService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  async listSpells(_req: Request, res: Response) {
    try {
      return res.json(await this.service.listAllSpells());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSpellById(req: Request, res: Response) {
    try {
      return res.json(await this.service.getSpellById(this.readParam(req.params, "spellId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async listPlayerSpells(req: Request, res: Response) {
    try {
      return res.json(await this.service.listPlayerSpells(this.readParam(req.params, "playerId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async learnSpell(req: Request, res: Response) {
    try {
      const body = req.body as LearnSpellRequest;
      return res.status(201).json(
        await this.service.learnSpell(this.readParam(req.params, "playerId"), body.spellId)
      );
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async unlearnSpell(req: Request, res: Response) {
    try {
      await this.service.unlearnSpell(this.readParam(req.params, "playerId"), this.readParam(req.params, "spellId"));
      return res.json({ message: "Spell unlearned" });
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
