// server/src/combat/controllers/CombatTimelineController.ts

import { Request, Response } from "express";
import { CombatTimelineService } from "../services/CombatTimelineService";

export class CombatTimelineController {
  constructor(
    private readonly service: CombatTimelineService = new CombatTimelineService()
  ) {}

  getTimeline = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const timeline = await this.service.getTimeline(combatId);
    res.json(timeline);
  };

  resetTimeline = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });
    await this.service.resetTimeline(combatId);
    res.status(204).send();
  };
}
