// server/src/modules/spells/SpellsService.ts

import { AppError } from '../../errors/AppError.js';
import { SpellsRepository } from './SpellsRepository.js';
import { SpellDTO, PlayerSpellDTO } from './types.js';

export class SpellsService {
  constructor(private repo: SpellsRepository) {}

  async listAllSpells(): Promise<SpellDTO[]> {
    try {
      return await this.repo.listAllSpells();
    } catch (error) {
      throw new AppError('Failed to list spells', 500);
    }
  }

  async getSpellById(spellId: string): Promise<SpellDTO> {
    if (!spellId) throw new AppError('Spell ID is required', 400);
    const spell = await this.repo.getSpellById(spellId);
    if (!spell) throw new AppError('Spell not found', 404);
    return spell;
  }

  async listPlayerSpells(playerId: string): Promise<PlayerSpellDTO[]> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    try {
      return await this.repo.listPlayerSpells(playerId);
    } catch (error) {
      throw new AppError('Failed to list player spells', 500);
    }
  }

  async learnSpell(playerId: string, spellId: string): Promise<PlayerSpellDTO> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!spellId) throw new AppError('Spell ID is required', 400);

    const spell = await this.repo.getSpellById(spellId);
    if (!spell) throw new AppError('Spell not found', 404);

    const alreadyKnows = await this.repo.checkPlayerKnowsSpell(playerId, spellId);
    if (alreadyKnows) throw new AppError('Spell already learned', 409);

    try {
      return await this.repo.learnSpell(playerId, spellId);
    } catch (error: any) {
      if (error.code === 'P2025') throw new AppError('Player not found', 404);
      throw new AppError('Failed to learn spell', 500);
    }
  }

  async unlearnSpell(playerId: string, spellId: string): Promise<void> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!spellId) throw new AppError('Spell ID is required', 400);

    try {
      await this.repo.unlearnSpell(playerId, spellId);
    } catch (error: any) {
      throw new AppError('Failed to unlearn spell', 500);
    }
  }
}

