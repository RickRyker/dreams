// server/src/players/controllers/PlayerDeleteController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerDeleteService } from "../services/PlayerDeleteService";

export class PlayerDeleteController {
  constructor(private readonly service: PlayerDeleteService) {}

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      await this.service.delete(playerId);
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };
}
