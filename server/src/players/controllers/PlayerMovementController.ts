// server/src/players/controllers/PlayerMovementController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerMovementService } from "../services/PlayerMovementService";

export class PlayerMovementController {
  constructor(private readonly movement: PlayerMovementService) {}

  move = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { x, y } = req.body;
      const dto = await this.movement.move(playerId, x, y);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  changeZone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { mapId, x, y } = req.body;
      const dto = await this.movement.changeZone(playerId, mapId, x, y);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  moveDelta = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { dx, dy } = req.body;
      const dto = await this.movement.moveByDelta(playerId, dx, dy);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };
}
