// server/src/combat/controllers/CombatReplayController.ts

import {Request, Response} from "express";
import {CombatReplayService} from "../services/CombatReplayService";

export class CombatReplayController {
  constructor(
    private readonly service: CombatReplayService = new CombatReplayService()
  ) {}

  getReplay = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const replay = await this.service.getReplay(combatId);
    if (!replay) return res.status(404).send();
    res.json(replay);
  };

  deleteReplay = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteReplay(combatId);
    res.status(204).send();
  };
}
