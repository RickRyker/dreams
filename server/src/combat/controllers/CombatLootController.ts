// server/src/combat/controllers/CombatLootController.ts

import {Request, Response} from "express";
import {CombatLootService} from "../services/CombatLootService";

export class CombatLootController {
  constructor(
    private readonly service: CombatLootService = new CombatLootService()
  ) {}

  getLoot = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    const loot = await this.service.getLoot(id);
    if (!loot) return res.status(404).send();
    res.json(loot);
  };

  listByParticipant = async (req: Request, res: Response) => {
    const participantId: string = Array.isArray(req.params.participantId)
      ? req.params.participantId[0]
      : req.params.participantId;
    if (!participantId) return res.status(403).json({ error: "BAD REQUEST" });

    const loot = await this.service.listByParticipant(participantId);
    res.json(loot);
  };

  deleteLoot = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteLoot(id);
    res.status(204).send();
  };
}
