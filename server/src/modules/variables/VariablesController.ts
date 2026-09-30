// server/src/modules/variables/VariablesController.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { VariablesService } from "./VariablesService.js";
import { SetVariableRequest } from "./types.js";

export class VariablesController {
  constructor(private service: VariablesService) {}

  private normalizeParam(value: string | string[] | undefined) {
    if (Array.isArray(value)) return value[0] ?? "";
    return value ?? "";
  }

  async listVariables(req: Request, res: Response) {
    try {
      const variables = await this.service.listPlayerVariables(this.normalizeParam(req.params.playerId));
      return res.json(variables);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getVariable(req: Request, res: Response) {
    try {
      const variable = await this.service.getVariable(
        this.normalizeParam(req.params.playerId),
        this.normalizeParam(req.params.name)
      );
      return res.json(variable);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async setVariable(req: Request, res: Response) {
    try {
      const body = req.body as SetVariableRequest;
      const variable = await this.service.setVariable(
        this.normalizeParam(req.params.playerId),
        body.name,
        body.value
      );
      return res.status(201).json(variable);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteVariable(req: Request, res: Response) {
    try {
      const variable = await this.service.deleteVariable(
        this.normalizeParam(req.params.playerId),
        this.normalizeParam(req.params.name)
      );
      return res.json(variable);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
