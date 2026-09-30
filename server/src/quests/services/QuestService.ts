// server/src/quests/services/QuestService.ts

import type { Player, Quest } from "@prisma/client";
import { prisma } from "@prisma";
import { QuestRepository } from "../repositories/QuestRepository";
import { QuestWithRelations } from "../mappers/QuestMapper";
import { QuestAuthorizationService } from "./QuestAuthorizationService";
import { AuditLogger } from "../../audit/AuditLogger";
import { QuestValidationEngine } from "./QuestValidationEngine";
import { QuestVersioningService } from "./QuestVersioningService";
import { QuestAssembler } from "../assemblers/QuestAssembler";
import { QuestDetailDomain, QuestEditorCommand, QuestSearchCommand, QuestSummaryDomain } from "../domain/QuestDomain";

export class QuestService {
  constructor(
    private readonly quests: QuestRepository,
    private readonly auth: QuestAuthorizationService,
    private readonly versioning: QuestVersioningService,
  ) {}

  async getQuestModelById(id: string): Promise<Quest | null> {
    return this.quests.findById(id);
  }

  async getActor(id: string): Promise<Player> {
    return prisma.player.findUniqueOrThrow({ where: { id } });
  }

  canActorEditQuest(actor: Player, quest: Quest): boolean {
    return this.auth.canEditQuest(actor, quest);
  }

  async getById(id: string): Promise<QuestDetailDomain | null> {
    const quest: QuestWithRelations | null = await this.quests.findById(id); // QuestWithRelations | null
    return quest ? QuestAssembler.toDetailDtoFromModel(quest as QuestWithRelations) : null;
  }

  async getBySlug(slug: string): Promise<QuestDetailDomain | null> {
    const quest: QuestWithRelations | null = await this.quests.findBySlug(slug); // QuestWithRelations | null
    return quest ? QuestAssembler.toDetailDtoFromModel(quest as QuestWithRelations) : null;
  }

  async create(actorId: string, payload: QuestEditorCommand): Promise<QuestDetailDomain> {
    QuestValidationEngine.validate(payload);

    const created: Quest = await this.quests.create(payload); // Quest
    const full: QuestWithRelations | null = await this.quests.findById(created.id); // QuestWithRelations | null

    if (!full) {
      throw new Error("Quest not found after creation");
    }

    await this.versioning.snapshot(created.id, actorId, "CREATE", payload);
    AuditLogger.questEdit(actorId, created.id, "CREATED");

    return QuestAssembler.toDetailDtoFromModel(full as QuestWithRelations);
  }

  async update(
    actorId: string,
    id: string,
    payload: QuestEditorCommand
  ): Promise<QuestDetailDomain> {
    QuestValidationEngine.validate(payload);

    await this.quests.update(id, payload); // we don't need the bare Quest here
    const full: QuestWithRelations | null = await this.quests.findById(id); // QuestWithRelations | null

    if (!full) {
      throw new Error("Quest not found after update");
    }

    await this.versioning.snapshot(id, actorId, "UPDATE", payload);
    AuditLogger.questEdit(actorId, id, "UPDATED");

    return QuestAssembler.toDetailDtoFromModel(full as QuestWithRelations);
  }

  async delete(actorId: string, id: string): Promise<void> {
    await this.quests.delete(id);

    await this.versioning.snapshot(id, actorId, "DELETE", null);
    AuditLogger.questEdit(actorId, id, "DELETED");
  }

  async search(query: QuestSearchCommand): Promise<QuestSummaryDomain[]> {
    const results: Quest[] = await this.quests.search(query); // Quest[]
    return results.map((q) => QuestAssembler.toSummaryDtoFromModel(q));
  }
}
