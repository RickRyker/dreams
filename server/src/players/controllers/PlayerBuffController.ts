// server/src/players/controllers/PlayerBuffController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerBuffService } from "../services/PlayerBuffService";

export class PlayerBuffController {
  constructor(private readonly service: PlayerBuffService) {}

  apply = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
      const { type, magnitude, durationMs, element, tickIntervalMs } = req.body;
      const effect = await this.service.applyEffect(
        playerId,
        type,
        magnitude,
        durationMs,
        element,
        tickIntervalMs
      );
      res.status(200).json(effect);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const effectId: any = Array.isArray(req.params.effectId)
        ? req.params.effectId[0]
        : req.params.effectId;
      if (!effectId) return res.status(403).json({ error: "BAD REQUEST" });

      await this.service.removeEffect(effectId);
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const effects = await this.service.list(playerId);
      res.status(200).json(effects);
    } catch (err) {
      next(err);
    }
  };
}
