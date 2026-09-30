// server/src/combat/controllers/CombatEventController.ts

import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";
import { CombatEventService } from "../services/CombatEventService";

export class CombatEventController {
  constructor(
    private readonly service: CombatEventService = new CombatEventService(prismaClient)
  ) {}

  listByCombat = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const events = await this.service.listByCombat(combatId);
    res.json(events);
  };

  deleteByCombat = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteByCombat(combatId);
    res.status(204).send();
  };
}
