// server/src/modules/admin/admin.controller.ts

import { Request, Response } from 'express';
import {
  banPlayerSchema,
  unbanPlayerSchema,
  mutePlayerSchema,
  unmutePlayerSchema,
  teleportPlayerSchema,
  spawnMonsterSchema,
  spawnItemSchema,
  setStatSchema,
  addExpSchema,
  setLevelSchema,
  toggleInvisibilitySchema,
  killPlayerSchema,
  respawnPlayerSchema
} from './admin.schema';
import { AdminService } from './admin.service';

export class AdminController {
  constructor(private service: AdminService) {}

  private getActorPlayerId(req: Request): string | null {
    const gmParam = Array.isArray(req.params.gmPlayerId) ? req.params.gmPlayerId[0] : req.params.gmPlayerId;
    if (gmParam) return gmParam;

    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (paramPlayerId) return paramPlayerId;

    const body = req.body as { gmPlayerId?: unknown; playerId?: unknown } | undefined;
    if (typeof body?.gmPlayerId === "string") return body.gmPlayerId;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  banPlayer = async (req: Request, res: Response) => {
    const gmId = this.getActorPlayerId(req);
    if (!gmId) return res.status(400).json({ error: "BAD REQUEST" });
    const { playerId, reason, durationMs } = banPlayerSchema.parse(req.body);
    await this.service.banPlayer(gmId, playerId, reason, durationMs);
    res.status(204).send();
  };

  unbanPlayer = async (req: Request, res: Response) => {
    const { playerId } = unbanPlayerSchema.parse(req.body);
    await this.service.unbanPlayer(playerId);
    res.status(204).send();
  };

  mutePlayer = async (req: Request, res: Response) => {
    const gmId = this.getActorPlayerId(req);
    if (!gmId) return res.status(400).json({ error: "BAD REQUEST" });
    const { playerId, reason, durationMs } = mutePlayerSchema.parse(req.body);
    await this.service.mutePlayer(gmId, playerId, reason, durationMs);
    res.status(204).send();
  };

  unmutePlayer = async (req: Request, res: Response) => {
    const { playerId } = unmutePlayerSchema.parse(req.body);
    await this.service.unmutePlayer(playerId);
    res.status(204).send();
  };

  teleportPlayer = async (req: Request, res: Response) => {
    const { playerId, mapId, x, y } = teleportPlayerSchema.parse(req.body);
    await this.service.teleportPlayer(playerId, mapId, x, y);
    res.status(204).send();
  };

  spawnMonster = async (req: Request, res: Response) => {
    const { monsterTypeId, mapId, x, y, count } = spawnMonsterSchema.parse(req.body);
    await this.service.spawnMonster(monsterTypeId, mapId, x, y, count);
    res.status(204).send();
  };

  spawnItem = async (req: Request, res: Response) => {
    const { itemTypeId, mapId, x, y } = spawnItemSchema.parse(req.body);
    await this.service.spawnItem(itemTypeId, mapId, x, y);
    res.status(204).send();
  };

  setStat = async (req: Request, res: Response) => {
    const { playerId, stat, value } = setStatSchema.parse(req.body);
    await this.service.setStat(playerId, stat, value);
    res.status(204).send();
  };

  addExp = async (req: Request, res: Response) => {
    const { playerId, amount } = addExpSchema.parse(req.body);
    await this.service.addExp(playerId, amount);
    res.status(204).send();
  };

  setLevel = async (req: Request, res: Response) => {
    const { playerId, level } = setLevelSchema.parse(req.body);
    await this.service.setLevel(playerId, level);
    res.status(204).send();
  };

  toggleInvisibility = async (req: Request, res: Response) => {
    const { playerId, invisible } = toggleInvisibilitySchema.parse(req.body);
    await this.service.toggleInvisibility(playerId, invisible);
    res.status(204).send();
  };

  killPlayer = async (req: Request, res: Response) => {
    const { playerId } = killPlayerSchema.parse(req.body);
    await this.service.killPlayer(playerId);
    res.status(204).send();
  };

  respawnPlayer = async (req: Request, res: Response) => {
    const { playerId } = respawnPlayerSchema.parse(req.body);
    await this.service.respawnPlayer(playerId);
    res.status(204).send();
  };
}
