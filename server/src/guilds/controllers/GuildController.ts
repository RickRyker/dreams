// server/src/guilds/controllers/GuildController.ts


import { Request, Response } from "express";
import { GuildService } from "../services/GuildService";
import { getParam } from "../../http/getParam";
import { createGuildRequestSchema } from "../validators/GuildSchemas";
import { GuildAssembler } from "../assemblers/GuildAssembler";

export class GuildController {
  constructor(private readonly service: GuildService) {}

  createGuild = async (req: Request, res: Response) => {
    try {
      const dto = createGuildRequestSchema.parse(req.body);
      const guild = await this.service.createGuild(GuildAssembler.toCreateGuildCommand(dto));
      res.status(201).json(guild);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getGuild = async (req: Request, res: Response) => {
    const guildId: string | null = getParam(req.params.guildId);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const guild = await this.service.getGuild(guildId);
      if (!guild) return res.status(404).json({ error: "Guild not found" });
      res.json(guild);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

}
