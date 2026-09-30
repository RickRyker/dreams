// server/src/players/controllers/PlayerDeathController.ts

import {NextFunction, Request, Response} from "express";
import {PlayerDeathService} from "../services/PlayerDeathService";
import {getParam} from "../../http/getParam";

export class PlayerDeathController {
  constructor(private readonly deaths: PlayerDeathService) {}

  record = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
      const { killerId } = req.body;
      if (!killerId) return res.status(403).json({ error: "BAD REQUEST" });
      // now retrieve the map the player is currently on and use it to set the player death record
      await this.deaths.recordDeath(playerId, killerId);
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };

  respawn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const dto = await this.deaths.respawn(playerId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  history = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const list: any[] = await this.deaths.getDeathHistory(playerId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
}
