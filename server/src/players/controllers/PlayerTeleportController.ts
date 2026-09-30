// server/src/players/controllers/PlayerTeleportController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerTeleportService } from "../services/PlayerTeleportService";

export class PlayerTeleportController {
  constructor(private readonly service: PlayerTeleportService) {}

  teleport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { mapId, x, y } = req.body;

      const dto = await this.service.teleport(playerId, mapId, x, y);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };
}
