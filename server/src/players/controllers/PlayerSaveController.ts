// server/src/players/controllers/PlayerSaveController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerSaveService } from "../services/PlayerSaveService";
import { PlayerUpdateSchema } from "shared";
import { PlayerAssembler } from "../assemblers/PlayerAssembler";

export class PlayerSaveController {
  constructor(private readonly service: PlayerSaveService) {}

  save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playerId: string = Array.isArray(req.params.playerId)
        ? req.params.playerId[0]
        : req.params.playerId;
      if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

      const dto = PlayerUpdateSchema.parse(req.body);
      const player = await this.service.update(playerId, PlayerAssembler.toUpdateCommand(dto));
      res.status(200).json(PlayerAssembler.toPlayerDto(player));
    } catch (err) {
      next(err);
    }
  };
}
