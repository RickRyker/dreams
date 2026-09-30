// server/src/modules/skills/SkillsService.ts

import { AppError } from '../../errors/AppError.js';
import { SkillsRepository } from './SkillsRepository.js';
import { SkillDTO, PlayerSkillDTO, SkillLevelUpEvent } from './types.js';

export class SkillsService {
  constructor(private repo: SkillsRepository) {}

  async listAllSkills(): Promise<SkillDTO[]> {
    try {
      return await this.repo.listAllSkills();
    } catch (error) {
      throw new AppError('Failed to list skills', 500);
    }
  }

  async getSkillById(skillId: string): Promise<SkillDTO> {
    if (!skillId) {
      throw new AppError('Skill ID is required', 400);
    }

    const skill = await this.repo.getSkillById(skillId);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    return skill;
  }

  async listPlayerSkills(playerId: string): Promise<PlayerSkillDTO[]> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }

    try {
      return await this.repo.listPlayerSkills(playerId);
    } catch (error) {
      throw new AppError('Failed to list player skills', 500);
    }
  }

  async addSkillXp(
    playerId: string,
    skillId: string,
    amount: number
  ): Promise<{ playerSkill: any; levelUp: boolean; newLevel?: number }> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }
    if (!skillId) {
      throw new AppError('Skill ID is required', 400);
    }
    if (amount <= 0) {
      throw new AppError('XP amount must be positive', 400);
    }

    // Verify skill exists
    const skill = await this.repo.getSkillById(skillId);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    try {
      const { playerSkill, levelUpEvent } = await this.repo.addSkillXp(
        playerId,
        skillId,
        amount
      );

      return {
        playerSkill,
        levelUp: !!levelUpEvent,
        newLevel: levelUpEvent?.newLevel
      };
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Player or skill not found', 404);
      }
      throw new AppError('Failed to add skill XP', 500);
    }
  }

  async initializePlayerSkills(playerId: string, skillIds: string[]): Promise<any[]> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }
    if (!skillIds || skillIds.length === 0) {
      throw new AppError('Skill IDs are required', 400);
    }

    // Verify all skills exist
    const skills = await Promise.all(
      skillIds.map((id) => this.repo.getSkillById(id))
    );

    if (skills.some((s) => !s)) {
      throw new AppError('One or more skills not found', 404);
    }

    try {
      return await this.repo.inTransaction(async (tx) => {
        const results = await Promise.all(
          skillIds.map((skillId) =>
            this.repo.initializePlayerSkill(playerId, skillId, tx)
          )
        );
        return results;
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Player not found', 404);
      }
      throw new AppError('Failed to initialize player skills', 500);
    }
  }
}
