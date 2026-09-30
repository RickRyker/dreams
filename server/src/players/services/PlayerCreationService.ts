// server/src/players/services/PlayerCreationService.ts

import { PlayerRepository } from "../repositories/PlayerRepository";
import { PlayerStatsRepository } from "../repositories/PlayerStatsRepository";
import { PlayerInventoryRepository } from "../repositories/PlayerInventoryRepository";
import { PlayerSpellRepository } from "../repositories/PlayerSpellRepository";
import { PlayerSkillRepository } from "../repositories/PlayerSkillRepository";
import { PlayerMapper } from "../mappers/PlayerMapper";
import type { PlayerCreateCommand, PlayerProfileDomain } from "../domain/PlayerDomain";
import {
  STARTING_STATS,
  STARTING_ITEMS,
  STARTING_SPELLS,
  STARTING_SKILLS,
  STARTING_CLASS,
  STARTING_SPAWN,
} from "../presets/PlayerCreationPresets";

export class PlayerCreationService {
  constructor(
    private readonly players: PlayerRepository,
    private readonly stats: PlayerStatsRepository,
    private readonly inventory: PlayerInventoryRepository,
    private readonly spells: PlayerSpellRepository,
    private readonly skills: PlayerSkillRepository
  ) {}

  async create(command: PlayerCreateCommand): Promise<PlayerProfileDomain> {
    const tutorialSpawn = await this.players.findTutorialSpawn();
    const fallbackMapId = await this.players.findMapIdBySlug(STARTING_SPAWN.mapSlug);
    const spawn = tutorialSpawn ?? {
      mapId: fallbackMapId ?? undefined,
      x: STARTING_SPAWN.x,
      y: STARTING_SPAWN.y,
    };

    const player = await this.players.createPlayer(command.accountId, command.name ?? undefined, {
      mapId: spawn.mapId,
      x: spawn.x,
      y: spawn.y,
    });

    await this.stats.create(player.id, STARTING_STATS);

    for (const item of STARTING_ITEMS) {
      const itemId = await this.players.findItemIdBySlug(item.slug);
      if (!itemId) {
        console.warn(`Starting item not found, skipping: ${item.slug}`);
        continue;
      }
      await this.inventory.addItem(player.id, itemId, item.quantity);
    }

    for (const spell of STARTING_SPELLS) {
      const spellId = await this.players.findSpellIdBySlug(spell);
      if (!spellId) {
        console.warn(`Starting spell not found, skipping: ${spell}`);
        continue;
      }
      await this.spells.learnSpell(player.id, spellId);
    }

    for (const skill of STARTING_SKILLS) {
      const skillId = await this.players.findSkillIdBySlug(skill);
      if (!skillId) {
        console.warn(`Starting skill not found, skipping: ${skill}`);
        continue;
      }
      await this.skills.learnSkill(player.id, skillId);
    }

    const classId = await this.players.findClassIdByName(STARTING_CLASS);
    if (classId) {
      await this.players.assignClass(player.id, STARTING_CLASS);
    } else {
      console.warn(`Starting class not found, skipping: ${STARTING_CLASS}`);
    }

    return PlayerMapper.fromPrisma(player);
  }
}
