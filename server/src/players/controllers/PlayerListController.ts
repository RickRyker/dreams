// server/src/players/controllers/PlayerListController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerListService } from "../services/PlayerListService";
import { PlayerAssembler } from "../assemblers/PlayerAssembler";

export class PlayerListController {
  constructor(private readonly service: PlayerListService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.auth?.accountId;
      if (!accountId) return res.status(401).json({ error: "UNAUTHENTICATED" });

      const list = await this.service.list(accountId);
      res.status(200).json(list.map(PlayerAssembler.toPlayerListDto));
    } catch (err) {
      next(err);
    }
  };
}
