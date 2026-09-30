// server/src/guilds/controllers/GuildMemberController.ts


import {Request, Response} from "express";
import {GuildService} from "../services/GuildService";
import {getParam} from "../../http/getParam";
import {
  addMemberRequestSchema,
  promoteMemberRequestSchema,
  removeMemberRequestSchema,
} from "../validators/GuildSchemas";
import { GuildAssembler } from "../assemblers/GuildAssembler";

export class GuildMemberController {
  constructor(private readonly service: GuildService) {}

  removeMember = async (req: Request, res: Response) => {
    const guildId: string | null = getParam(req.params.guildId);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    const actorId: string | null = getParam(req.params.actorId);
    if (!actorId) return res.status(403).json({ error: "BAD REQUEST" });
    const targetId: string | null = getParam(req.params.targetId);
    if (!targetId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const dto = removeMemberRequestSchema.parse({ guildId, actorId, targetId });
      await this.service.removeMember(GuildAssembler.toRemoveMemberCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  addMember = async (req: Request, res: Response) => {
    try {
      const dto = addMemberRequestSchema.parse(req.body);
      await this.service.addMember(GuildAssembler.toAddMemberCommand(dto));
      res.status(201).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  promoteMember = async (req: Request, res: Response) => {
    try {
      const dto = promoteMemberRequestSchema.parse(req.body);
      await this.service.promoteMember(GuildAssembler.toPromoteMemberCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
