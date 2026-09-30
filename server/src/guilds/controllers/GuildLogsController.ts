// server/src/guilds/controllers/GuildLogsController.ts


import {Request, Response} from "express";
import {GuildService} from "../services/GuildService";
import {getParam} from "../../http/getParam";
import { listGuildLogsRequestSchema } from "../validators/GuildSchemas";
import { GuildAssembler } from "../assemblers/GuildAssembler";

export class GuildLogsController {
  constructor(private readonly service: GuildService) {}

  listLogs = async (req: Request, res: Response) => {
    const guildId: string | null = getParam(req.params.guildId);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    const playerId: string | null = getParam(req.params.playerId);
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const dto = listGuildLogsRequestSchema.parse({ guildId, playerId });
      const logs: any[] = await this.service.listLogs(GuildAssembler.toListGuildLogsCommand(dto));
      res.json(logs);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
