// server/src/combat/controllers/CombatSessionController.ts

import {Request, Response} from "express";
import {CombatSessionService} from "../services/CombatSessionService";

export class CombatSessionController {
  constructor(
    private readonly service: CombatSessionService = new CombatSessionService()
  ) {}

  getSession = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const session = await this.service.getSession(combatId);
    if (!session) return res.status(404).send();
    res.json(session);
  };

  deleteSession = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteSession(combatId);
    res.status(204).send();
  };
}
