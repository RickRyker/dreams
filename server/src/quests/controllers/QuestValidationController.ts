// server/src/quests/controllers/QuestValidationController.ts

import { Request, Response } from "express";
import { QuestValidationService } from "../services/QuestValidationService";

export class QuestValidationController {

  constructor(private readonly validation: QuestValidationService) {}

  globalGraphCheck = async (_req: Request, res: Response) => {
    const result = await this.validation.validateGlobalGraph();
    res.status(200).json(result);
  };

  validateQuest = async (req: Request, res: Response) => {
    const questId: string = Array.isArray(req.params.questId)
      ? req.params.questId[0]
      : req.params.questId;
    if (!questId) return res.status(403).json({ error: "BAD REQUEST" });

    const result = await this.validation.validateQuestDefinition(questId);
    res.status(200).json(result);
  };

  validateEligibility = async (_req: Request, res: Response) => {
    res.status(501).json({ error: "NOT_IMPLEMENTED" });
  };

  validatePlayerEligibility = async (_req: Request, res: Response) => {
    res.status(501).json({ error: "NOT_IMPLEMENTED" });
  };

}
