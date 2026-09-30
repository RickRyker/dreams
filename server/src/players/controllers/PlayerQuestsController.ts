// server/src/players/controllers/PlayerQuestsController.ts

import { NextFunction, Request, Response } from "express";
import { PlayerQuestService } from "../services/PlayerQuestService";
import {getParam} from "../../http/getParam";

export class PlayerQuestsController {

  constructor(private readonly service: PlayerQuestService) {}

  startQuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
      const { questId } = req.body;
      if (!questId) return res.status(403).json({ error: "BAD REQUEST" });
      const dto = await this.service.startQuest(playerId, questId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  completeQuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
      const questId: string | null = getParam(req.params.questId);
      if (!questId) return res.status(403).json({ error: "BAD REQUEST" });
      const dto = await this.service.completeQuest(playerId, questId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string | null = getParam(req.params.playerId);
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
      const list = await this.service.list(playerId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

}
