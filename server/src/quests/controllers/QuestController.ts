// server/src/quests/controllers/QuestController.ts

import { Request, Response } from "express";
import { getParam } from "../../http/getParam";
import { Player, Quest } from "@prisma/client";
import { QuestService } from "../services/QuestService";
import { QuestEditorPayloadSchema, QuestSearchQuerySchema } from "shared";
import { QuestAssembler } from "../assemblers/QuestAssembler";
import type { QuestEditorCommand, QuestSearchCommand } from "../domain/QuestDomain";

export class QuestController {
  constructor(private readonly service: QuestService) {}

  private readPlayerId(req: Request): string | null {
    const playerFromParams = getParam(req.params.playerId);
    if (playerFromParams) return playerFromParams;

    const body = req.body as { playerId?: unknown } | undefined;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  private async loadAuthorizedContext(
    req: Request,
    res: Response
  ): Promise<{ id: string; actor: Player; quest: Quest } | null> {
    const id = getParam(req.params.id);
    if (!id) {
      res.status(400).json({ error: "Invalid quest id" });
      return null;
    }

    const actorId = this.readPlayerId(req);
    if (!actorId) {
      res.status(400).json({ error: "BAD REQUEST" });
      return null;
    }
    const actor = await this.service.getActor(actorId);

    const quest = await this.service.getQuestModelById(id);
    if (!quest) {
      res.status(404).json({ error: "Quest not found" });
      return null;
    }

    if (!this.service.canActorEditQuest(actor, quest)) {
      res.status(403).json({ error: "You cannot edit this quest" });
      return null;
    }

    return { id, actor, quest };
  }

  async getById(req: Request, res: Response) {
    const id = getParam(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid quest id" });

    const quest = await this.service.getById(id);
    if (!quest) return res.status(404).json({ error: "Quest not found" });

    return res.json(quest);
  }

  async getBySlug(req: Request, res: Response) {
    const slug = getParam(req.params.slug);
    if (!slug) return res.status(400).json({ error: "Invalid slug" });

    const quest = await this.service.getBySlug(slug);
    if (!quest) return res.status(404).json({ error: "Quest not found" });

    return res.json(quest);
  }

  async create(req: Request, res: Response) {
    const actorId = this.readPlayerId(req);
    if (!actorId) return res.status(400).json({ error: "BAD REQUEST" });
    const payload: QuestEditorCommand = QuestAssembler.toEditorCommand(QuestEditorPayloadSchema.parse(req.body));

    const quest = await this.service.create(actorId, payload);
    return res.status(201).json(quest);
  }

  async update(req: Request, res: Response) {
    const ctx = await this.loadAuthorizedContext(req, res);
    if (!ctx) return;

    const payload: QuestEditorCommand = QuestAssembler.toEditorCommand(QuestEditorPayloadSchema.parse(req.body));
    const updated = await this.service.update(ctx.actor.id, ctx.id, payload);

    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const ctx = await this.loadAuthorizedContext(req, res);
    if (!ctx) return;

    await this.service.delete(ctx.actor.id, ctx.id);
    return res.status(204).send();
  }

  async search(req: Request, res: Response) {
    const query: QuestSearchCommand = QuestAssembler.toSearchCommand(QuestSearchQuerySchema.parse(req.query));
    const results = await this.service.search(query);
    return res.json(results);
  }
}
