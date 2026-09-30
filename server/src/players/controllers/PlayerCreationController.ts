// server/src/players/controllers/PlayerCreationController.ts

import { Request, Response, NextFunction } from "express";
import { PlayerCreationService } from "../services/PlayerCreationService";
import { z } from "zod";
import { PlayerAssembler } from "../assemblers/PlayerAssembler";

const CreatePlayerRequestSchema = z.object({
  name: z.string().optional(),
});

export class PlayerCreationController {
  constructor(private readonly service: PlayerCreationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.auth?.accountId;
      if (!accountId) return res.status(403).json({ error: "BAD REQUEST" });

      const dto = CreatePlayerRequestSchema.parse(req.body);
      const player = await this.service.create(PlayerAssembler.toCreateCommand(accountId, dto));

      res.status(201).json(PlayerAssembler.toPlayerDto(player));
    } catch (err) {
      next(err);
    }
  };
}
