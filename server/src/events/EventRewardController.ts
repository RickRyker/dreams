// server/src/events/EventRewardController.ts

import { Request, Response } from 'express';
import { EventRewardService } from './EventRewardService';

export class EventRewardController {
  constructor(private service: EventRewardService) {}

  preview = async (req: Request, res: Response) => {
    const playerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    res.json(await this.service.preview(playerId, slug));
  };

  claim = async (req: Request, res: Response) => {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    const body = req.body as { playerId?: unknown } | undefined;
    const playerId = paramPlayerId ?? (typeof body?.playerId === "string" ? body.playerId : "");
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    res.json(await this.service.claim(playerId, slug));
  };
}
