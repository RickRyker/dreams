// server/src/modules/roles/RolesController.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { RolesService } from "./RolesService";
import { AssignRoleRequest, RemoveRoleRequest } from "./types";

export class RolesController {
  constructor(private service: RolesService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  listRoles = async (_req: Request, res: Response) => {
    try {
      return res.json(await this.service.listRoles());
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getRoleById = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getRoleById(this.readParam(req.params, "roleId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  assignRole = async (req: Request, res: Response) => {
    try {
      const body = req.body as AssignRoleRequest;
      return res.status(201).json(await this.service.assignRoleToPlayer(body.playerId, body.roleId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  removeRole = async (req: Request, res: Response) => {
    try {
      const body = req.body as RemoveRoleRequest;
      return res.json(await this.service.removeRoleFromPlayer(body.playerId, body.roleId));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  checkPermission = async (req: Request, res: Response) => {
    try {
      const playerId = this.readParam(req.params, "playerId");
      const permission = String(req.query.permission ?? "");
      if (!permission) return res.status(400).json({ error: "Permission query parameter is required" });
      return res.json({ hasPermission: await this.service.playerHasPermission(playerId, permission) });
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
