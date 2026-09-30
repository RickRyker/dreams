// server/src/modules/roles/roles.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { RolesService } from "./RolesService";
import { RolesRepository } from "./RolesRepository";
import { RolesMapper } from "./RolesMapper";

const service = new RolesService(new RolesRepository(), new RolesMapper());

export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    const body = req.body as { playerId?: unknown } | undefined;
    const playerId = paramPlayerId ?? (typeof body?.playerId === "string" ? body.playerId : null);
    if (!playerId) return res.status(403).json({ error: "No active player" });

    const allowed = await service.playerHasPermission(playerId, permission);
    if (!allowed) return res.status(403).json({ error: "Forbidden" });

    return next();
  };
};
