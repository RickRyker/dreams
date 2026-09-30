// server/src/players/controllers/PlayerFullHydrationController.ts

import { NextFunction, Request, Response } from "express";
import { PlayerHydrationService } from "../services/PlayerHydrationService";

export class PlayerFullHydrationController {
  constructor(private readonly hydration: PlayerHydrationService) {}

  private getParamAsString(value: string | string[] | undefined): string | null {
    if (!value) return null;
    return Array.isArray(value) ? value[0] : value;
  }

  hydrate = async (req: Request, res: Response, _next?: NextFunction) => {
    const playerId: string | null = this.getParamAsString(req.params.playerId);
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

    const dto = await this.hydration.hydrate(playerId);
    res.status(200).json(dto);
  };

  load = this.hydrate;
}
