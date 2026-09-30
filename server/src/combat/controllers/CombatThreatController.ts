// server/src/combat/controllers/CombatThreatController.ts

import {Request, Response} from "express";
import {CombatThreatService} from "../services/CombatThreatService";

export class CombatThreatController {
  constructor(
    private readonly service: CombatThreatService = new CombatThreatService()
  ) {}

  getThreat = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    const threat = await this.service.getThreat(id);
    if (!threat) return res.status(404).send();
    res.json(threat);
  };

  listByCombat = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const threats = await this.service.listByCombat(combatId);
    res.json(threats);
  };

  listByMonster = async (req: Request, res: Response) => {
    const monsterId: string = Array.isArray(req.params.monsterId)
      ? req.params.monsterId[0]
      : req.params.monsterId;
    if (!monsterId) return res.status(403).json({ error: "BAD REQUEST" });

    const threats = await this.service.listByMonster(monsterId);
    res.json(threats);
  };

  listByTarget = async (req: Request, res: Response) => {
    const targetId: string = Array.isArray(req.params.targetId)
      ? req.params.targetId[0]
      : req.params.targetId;
    if (!targetId) return res.status(403).json({ error: "BAD REQUEST" });

    const threats = await this.service.listByTarget(targetId);
    res.json(threats);
  };

  deleteThreat = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteThreat(id);
    res.status(204).send();
  };
}
