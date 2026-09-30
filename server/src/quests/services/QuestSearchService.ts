// server/src/quests/services/QuestSearchService.ts

import { QuestRepository } from "../repositories/QuestRepository";
import { QuestSearchCommand } from "../domain/QuestDomain";

export class QuestSearchService {
  constructor(private readonly quests: QuestRepository) {}

  async search(query: QuestSearchCommand) {
    return this.quests.search({
      name: query.name,
      slug: query.slug,
      createdById: query.createdById,
      requiresItemSlug: query.requiresItemSlug,
      rewardsItemSlug: query.rewardsItemSlug,
      requiresQuestSlug: query.requiresQuestSlug,
    });
  }
}
