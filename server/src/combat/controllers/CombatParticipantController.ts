// server/src/combat/controllers/CombatParticipantController.ts

import {Request, Response} from "express";
import {CombatParticipantService} from "../services/CombatParticipantService";

export class CombatParticipantController {
  constructor(
    private readonly service: CombatParticipantService = new CombatParticipantService()
  ) {}

  listParticipants = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    const participants = await this.service.listParticipants(combatId);
    res.json(participants);
  };

  getParticipant = async (req: Request, res: Response) => {
    const participantId: string = Array.isArray(req.params.participantId)
      ? req.params.participantId[0]
      : req.params.participantId;
    if (!participantId) return res.status(403).json({ error: "BAD REQUEST" });

    const participant = await this.service.getParticipant(participantId);
    if (!participant) return res.status(404).send();
    res.json(participant);
  };

  deleteParticipant = async (req: Request, res: Response) => {
    const id: string = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!id) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteParticipant(id);
    res.status(204).send();
  };

  deleteParticipantsForCombat = async (req: Request, res: Response) => {
    const combatId: string = Array.isArray(req.params.combatId)
      ? req.params.combatId[0]
      : req.params.combatId;
    if (!combatId) return res.status(403).json({ error: "BAD REQUEST" });

    await this.service.deleteParticipantsForCombat(combatId);
    res.status(204).send();
  };
}
