// server/src/guilds/controllers/GuildTreasuryController.ts


import { Request, Response } from "express";
import { GuildService } from "../services/GuildService";
import { getParam } from "../../http/getParam";
import {
  borrowItemRequestSchema,
  donateItemRequestSchema,
  returnItemRequestSchema,
  withdrawItemRequestSchema,
} from "../validators/GuildSchemas";
import { GuildAssembler } from "../assemblers/GuildAssembler";

function parseGuildParams(req: Request) {
  const guildId: string | null = getParam(req.params.guildId);
  const playerId: string | null = getParam(req.params.playerId);
  const itemId: string | null = getParam(req.params.itemId);
  return { guildId, playerId, itemId };
}

export class GuildTreasuryController {
  constructor(private readonly service: GuildService) {}

  donateItem = async (req: Request, res: Response) => {
    const { guildId, playerId, itemId } = parseGuildParams(req);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!itemId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const dto = donateItemRequestSchema.parse({ guildId, playerId, itemId });
      await this.service.donateItem(GuildAssembler.toDonateItemCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  returnItem = async (req: Request, res: Response) => {
    const { guildId, playerId, itemId } = parseGuildParams(req);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!itemId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const dto = returnItemRequestSchema.parse({ guildId, playerId, itemId });
      await this.service.returnItem(GuildAssembler.toReturnItemCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  borrowItem = async (req: Request, res: Response) => {
    const { guildId, playerId, itemId } = parseGuildParams(req);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!itemId) return res.status(403).json({ error: "BAD REQUEST" });
    try {
      const dto = borrowItemRequestSchema.parse({ guildId, playerId, itemId });
      await this.service.borrowItem(GuildAssembler.toBorrowItemCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  withdrawItem = async (req: Request, res: Response) => {
    const { guildId, playerId, itemId } = parseGuildParams(req);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });
    if (!itemId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const dto = withdrawItemRequestSchema.parse({ guildId, playerId, itemId });
      await this.service.withdrawItem(GuildAssembler.toWithdrawItemCommand(dto));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  listTreasuryItems = async (req: Request, res: Response) => {
    const guildId: string | null = getParam(req.params.guildId);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      const items = await this.service.listTreasuryItems(guildId);
      res.json(items);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  listBorrowedItems = async (req: Request, res: Response) => {
    const guildId: string | null = getParam(req.params.guildId);
    if (!guildId) return res.status(403).json({ error: "BAD REQUEST" });
    const playerId: string | null = getParam(req.params.playerId);
    if (!playerId) return res.status(403).json({ error: "BAD REQUEST" });

    try {
      // const dto: ListBorrowedItemsRequest = {guildId, playerId};
      const items = await this.service.listBorrowedItems(guildId, playerId);
      res.json(items);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

}
