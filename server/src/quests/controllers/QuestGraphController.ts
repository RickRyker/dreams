// server/src/quests/controllers/QuestGraphController.ts

import { Request, Response } from "express";
import { QuestGraphService } from "../services/QuestGraphService";

export class QuestGraphController {

  constructor(private readonly graph: QuestGraphService) {}

  globalIndex = async (_req: Request, res: Response) => {
    const mermaid = await this.graph.globalIndexMermaid();
    res.type("text/plain").send(mermaid);
  };

  dependencies = async (req: Request, res: Response) => {
    const questId: string = Array.isArray(req.params.questId)
      ? req.params.questId[0]
      : req.params.questId;
    if (!questId) return res.status(403).json({ error: "BAD REQUEST" });

    const mermaid: string | null = await this.graph.questDependenciesMermaid(questId);
    if (!mermaid) return res.status(404).json({ error: "QUEST_NOT_FOUND" });
    res.type("text/plain").send(mermaid);
  };

  flow = async (_req: Request, res: Response) => {
    res.status(501).json({ error: "NOT_IMPLEMENTED" });
  };

}
