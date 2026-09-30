// server/src/combat/controllers/CombatCastController.ts

import {Request, Response} from "express";
import {CombatCastService} from "../services/CombatCastService";

export class CombatCastController {
  constructor(
    private readonly service: CombatCastService = new CombatCastService()
  ) {}

  getCast = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    const cast = await this.service.getCast(id);
    if (!cast) return res.status(404).send();
    res.json(cast);
  };

  listByCombat = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const casts = await this.service.listByCombat(combatId);
    res.json(casts);
  };

  listByCaster = async (req: Request, res: Response) => {
    const casterId: string = Array.isArray(req.params.casterId)
      ? req.params.casterId[0]
      : req.params.casterId;
    if (!casterId) return res.status(403).json({ error: "BAD REQUEST" });

    const casts = await this.service.listByCaster(casterId);
    res.json(casts);
  };

  deleteCast = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteCast(id);
    res.status(204).send();
  };

  castSpell = async (req: Request, res: Response) => {
    const cast = await this.service.castSpell(req.body);
    res.status(201).json(cast);
  };
}
