// server/src/modules/achievement-progress/achievement-progress.controller.ts

import { Request, Response } from 'express';
import { AchievementProgressService } from './achievement-progress.service';

export class AchievementProgressController {
  constructor(private service: AchievementProgressService) {}

  private readPlayerId(req: Request): string | null {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (paramPlayerId) return paramPlayerId;

    const body = req.body as { playerId?: unknown } | undefined;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  record = async (req: Request, res: Response) => {
    const playerId = this.readPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { activityType, activityData } = req.body;
    const result = await this.service.recordActivity(playerId, activityType, activityData);
    res.json(result);
  };
}
