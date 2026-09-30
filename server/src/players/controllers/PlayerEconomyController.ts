// server/src/players/controllers/PlayerEconomyController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerEconomyService } from "../services/PlayerEconomyService";

export class PlayerEconomyController {
  constructor(private readonly service: PlayerEconomyService) {}

  addGold = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { amount } = req.body;
      const dto = await this.service.addGold(playerId, amount);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  removeGold = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const { amount } = req.body;
      const dto = await this.service.removeGold(playerId, amount);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  transferGold = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fromId: any = Array.isArray(req.params.fromId)
        ? req.params.fromId[0]
        : req.params.fromId;
      if (!fromId) return res.status(403).json({ error: "BAD REQUEST" });

      const toId: any = Array.isArray(req.params.toId)
        ? req.params.toId[0]
        : req.params.toId;
      if (!toId) return res.status(403).json({ error: "BAD REQUEST" });

      const { amount } = req.body;
      const result = await this.service.transferGold(fromId, toId, amount);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
