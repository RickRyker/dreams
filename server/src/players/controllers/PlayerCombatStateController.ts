// server/src/players/controllers/PlayerCombatStateController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerCombatStateService } from "../services/PlayerCombatStateService";

export class PlayerCombatStateController {
  constructor(private readonly service: PlayerCombatStateService) {}

  enterCombat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const combatId: any = Array.isArray(req.params.combatId)
        ? req.params.combatId[0]
        : req.params.combatId;
      if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

      const dto = await this.service.enterCombat(playerId, combatId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  leaveCombat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const dto = await this.service.leaveCombat(playerId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  status = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: any = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const inCombat = await this.service.isInCombat(playerId);
      res.status(200).json({ inCombat });
    } catch (err) {
      next(err);
    }
  };
}
