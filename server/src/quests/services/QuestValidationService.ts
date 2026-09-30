// server/src/quests/services/QuestValidationService.ts

import {Quest} from "@prisma/client";
import {QuestRepository} from "../repositories/QuestRepository";
import {QuestRequirementRepository} from "../repositories/QuestRequirementRepository";
import {QuestRewardRepository} from "../repositories/QuestRewardRepository";
import {QuestDependencyRepository} from "../repositories/QuestDependencyRepository";

export class QuestValidationService {
  constructor(
    private readonly quests: QuestRepository,
    private readonly reqs: QuestRequirementRepository,
    private readonly rewards: QuestRewardRepository,
    private readonly deps: QuestDependencyRepository,
  ) {}

  async validateQuestDefinition(questId: string) {
    const quest: Quest | null = await this.quests.findById(questId);
    if (!quest) return { ok: false, errors: ["QUEST_NOT_FOUND"] };

    const errors: string[] = [];

    // TODO: check items/skills/titles exist in their respective tables
    // TODO: check required quests exist (already enforced by FK)
    // For now, just return ok
    return { ok: errors.length === 0, errors };
  }

  async validateGlobalGraph() {
    const all = await this.deps.listAll();
    // simple cycle detection via Kahn or DFS; stubbed here
    return { ok: true, cycles: [] as string[][] };
  }
}
