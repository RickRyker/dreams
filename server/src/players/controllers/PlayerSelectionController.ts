// server/src/players/controllers/PlayerSelectionController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerSelectionService } from "../services/PlayerSelectionService";

export class PlayerSelectionController {
  constructor(private readonly service: PlayerSelectionService) {}

  loadDefault = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string | undefined = req.auth?.accountId;
      if (!accountId) return res.status(401).json({ error: "UNAUTHENTICATED" });

      const dto = await this.service.loadDefaultCharacter(accountId);
      res.status(200).json(dto);
    } catch (err) {
      next(err);
    }
  };
}
