// server/src/quests/services/QuestGraphService.ts

import { QuestRepository } from "../repositories/QuestRepository";
import { QuestDependencyRepository } from "../repositories/QuestDependencyRepository";
import { QuestMermaidRenderer } from "../renderers/QuestMermaidRenderer";

export class QuestGraphService {
  constructor(
    private readonly quests: QuestRepository,
    private readonly deps: QuestDependencyRepository,
  ) {}

  async globalIndexMermaid() {
    const quests = await this.quests.listAllWithDependencies();
    return QuestMermaidRenderer.render(quests);
  }

  async questDependenciesMermaid(questId: string) {
    const quest = await this.quests.findById(questId);
    if (!quest) return null;
    const dependencies = await this.deps.listForQuest(questId);
    return QuestMermaidRenderer.render([
      {
        ...quest,
        dependencies,
      } as any,
    ]);
  }
}
