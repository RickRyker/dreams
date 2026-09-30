// server/src/players/services/PlayerQuestService.ts

import {InventoryItem, Item, Player, PlayerQuest, Quest} from "@prisma/client";
import {PlayerRepository} from "../repositories/PlayerRepository";
import {PlayerQuestRepository} from "../repositories/PlayerQuestRepository";
import {QuestRepository} from "../../quests/repositories/QuestRepository";
import {PlayerQuestMapper} from "../mappers/PlayerQuestMapper";
import {ForbiddenError, NotFoundError} from "shared";
import {prisma} from "@prisma";
import {PlayerInventoryRepository} from "../repositories/PlayerInventoryRepository";
import {PlayerSkillRepository} from "../repositories/PlayerSkillRepository";
import {PlayerSpellRepository} from "../repositories/PlayerSpellRepository";

export class PlayerQuestService {

  constructor(
    private readonly players: PlayerRepository = new PlayerRepository(),
    private readonly playerQuests: PlayerQuestRepository = new PlayerQuestRepository(),
    private readonly quests: QuestRepository = new QuestRepository(),
    private readonly inventoryRepo: PlayerInventoryRepository = new PlayerInventoryRepository(),
    private readonly skillRepo: PlayerSkillRepository = new PlayerSkillRepository(),
    private readonly spellRepo: PlayerSpellRepository = new PlayerSpellRepository()) {}

  // -----------------------------
  // Eligibility
  // -----------------------------
  async canStartQuest(playerId: string, questId: string) {
    const player: any = await this.players.findFullPlayer(playerId);
    if (!player) throw new NotFoundError("PLAYER_NOT_FOUND");
    const quest: any = await this.quests.findById(questId);
    if (!quest) throw new NotFoundError("QUEST_NOT_FOUND");

    // Level requirement
    const levelReq: any = quest.requirementLevel;
    if (levelReq && ((player.stats?.level ?? 0) < levelReq.level)) {
      return { ok: false, reason: "LEVEL_TOO_LOW" };
    }

    // Required quests
    const requiredQuestIds: string[] = quest.requirementQuests.map((rq: any) => rq.requiredQuestId);
    if (requiredQuestIds.length > 0) {
      const completed: PlayerQuest[] = await prisma.playerQuest.findMany({
        where: {
          playerId,
          questId: { in: requiredQuestIds },
          status: "COMPLETED",
        },
      });
      if (completed.length !== requiredQuestIds.length) {
        return { ok: false, reason: "MISSING_PREREQUISITE_QUESTS" };
      }
    }

    // Required items (simple existence check)
    for (const req of quest.requirementItems) {
      const inv: any = await prisma.inventoryItem.findFirst({
        where: { playerId, itemSlug: req.itemSlug },
      });
      if (!inv || inv.quantity < req.quantity) {
        return { ok: false, reason: "MISSING_REQUIRED_ITEMS" };
      }
    }

    // Required skills
    for (const req of quest.requirementSkills) {
      const skill = await prisma.playerSkill.findFirst({
        where: { playerId, skillSlug: req.skillSlug },
      });
      if (!skill || skill.level < req.quantity) {
        return { ok: false, reason: "MISSING_REQUIRED_SKILLS" };
      }
    }

    return { ok: true };
  }

  // -----------------------------
  // Start quest
  // -----------------------------
  async startQuest(playerId: string, questId: string) {
    const eligibility = await this.canStartQuest(playerId, questId);
    if (!eligibility.ok) throw new ForbiddenError("QUEST_NOT_ELIGIBLE", eligibility.reason);

    return this.playerQuests.startQuest(playerId, questId);
  }

  // -----------------------------
  // Complete quest
  // -----------------------------
  async completeQuest(playerId: string, questId: string) {
    const pq: any = await this.playerQuests.getPlayerQuest(playerId, questId);
    if (!pq) throw new NotFoundError("PLAYER_QUEST_NOT_FOUND");

    const quest: any = await this.quests.findById(questId);
    if (!quest) throw new NotFoundError("QUEST_NOT_FOUND");

    //   const validations = await this.validator.canCompleteQuest(playerId, quest);
    //   if (!validations.ok) throw new Error(validations.reason);

    // Apply rewards
    for (const r of quest.rewardItems) {
      const item: any = await this.inventoryRepo.fetch(playerId, r.itemSlug);
      if (!item) {
        console.warn(`Reward item with slug ${r.itemSlug} not found for quest ${questId}`);
        continue; // Skip this reward but continue processing others
      }
      await this.inventoryRepo.add(playerId, item.id, r.quantity);
    }
    for (const r of quest.rewardSkills) {
      await this.skillRepo.learnSkill(playerId, r.skillSlug);
    }
    for (const t of quest.rewardTitles) {
      // id, questId, titleSlug,
    }

    // Titles, XP, gold can be added later

    return this.playerQuests.completeQuest(playerId, questId);
  }

  // -----------------------------
  // Hydration for PlayerFullDto
  // -----------------------------
  async hydratePlayerQuests(playerId: string) {
    const quests = await this.playerQuests.getPlayerQuests(playerId);

    const active = quests.filter((q) => q.status === "IN_PROGRESS");
    const completed = quests.filter((q) => q.status === "COMPLETED");

    // Next available quests = quests where:
    // - player hasn't started them
    // - eligibility passes
    const allQuests = await prisma.quest.findMany({
      include: {
        requirementItems: true,
        requirementSkills: true,
        requirementQuests: { include: { requiredQuest: true } },
        rewardItems: true,
        rewardSkills: true,
        rewardTitles: true,
      },
    });

    const startedIds = new Set(quests.map((q) => q.questId));

    const nextAvailable: { questId: string; slug: string; name: string }[] = [];

    for (const q of allQuests) {
      if (startedIds.has(q.id)) continue;

      const eligibility = await this.canStartQuest(playerId, q.id);
      if (eligibility.ok) {
        nextAvailable.push({
          questId: q.id,
          slug: q.slug,
          name: q.name,
        });
      }
    }

    return {
      active: active.map((pq) => ({
        questId: pq.questId,
        slug: pq.quest.slug,
        name: pq.quest.name,
        status: pq.status,
        completed: pq.completed,
      })),
      completed: completed.map((pq) => ({
        questId: pq.questId,
        slug: pq.quest.slug,
        name: pq.quest.name,
        status: pq.status,
        completed: pq.completed,
      })),
      nextAvailable,
    };
  }

  async list(playerId: string): Promise<any[]> {
    const models: any = await this.playerQuests.getPlayerQuests(playerId);
    return models.map(PlayerQuestMapper.fromPrisma);
  }

}
