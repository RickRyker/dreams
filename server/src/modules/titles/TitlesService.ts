// server/src/modules/titles/TitlesService.ts

import { AppError } from '../../errors/AppError.js';
import { TitlesRepository } from './TitlesRepository.js';
import { TitleDTO, PlayerTitleDTO } from './types.js';

export class TitlesService {
  constructor(private repo: TitlesRepository) {}

  async listAllTitles(): Promise<TitleDTO[]> {
    try {
      return await this.repo.listAllTitles();
    } catch (error) {
      throw new AppError('Failed to list titles', 500);
    }
  }

  async getTitleById(titleId: string): Promise<TitleDTO> {
    if (!titleId) {
      throw new AppError('Title ID is required', 400);
    }

    const title = await this.repo.getTitleById(titleId);
    if (!title) {
      throw new AppError('Title not found', 404);
    }

    return title;
  }

  async listPlayerTitles(playerId: string): Promise<PlayerTitleDTO[]> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }

    try {
      return await this.repo.listPlayerTitles(playerId);
    } catch (error) {
      throw new AppError('Failed to list player titles', 500);
    }
  }

  async awardTitleToPlayer(playerId: string, titleId: string): Promise<PlayerTitleDTO> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }
    if (!titleId) {
      throw new AppError('Title ID is required', 400);
    }

    // Verify title exists
    const title = await this.repo.getTitleById(titleId);
    if (!title) {
      throw new AppError('Title not found', 404);
    }

    try {
      return await this.repo.awardTitleToPlayer(playerId, titleId);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Player not found', 404);
      }
      if (error.code === 'P2002') {
        throw new AppError('Player already owns this title', 409);
      }
      throw new AppError('Failed to award title', 500);
    }
  }

  async equipTitle(playerId: string, titleId: string): Promise<any> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }
    if (!titleId) {
      throw new AppError('Title ID is required', 400);
    }

    // Verify title exists
    const title = await this.repo.getTitleById(titleId);
    if (!title) {
      throw new AppError('Title not found', 404);
    }

    // Check player owns this title
    const playerTitle = await this.repo.getPlayerTitle(playerId, titleId);
    if (!playerTitle) {
      throw new AppError('Player does not own this title', 403);
    }

    try {
      return await this.repo.equipTitle(playerId, titleId);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Player not found', 404);
      }
      throw new AppError('Failed to equip title', 500);
    }
  }

  async unequipTitle(playerId: string): Promise<any> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }

    try {
      return await this.repo.unequipTitle(playerId);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Player not found', 404);
      }
      throw new AppError('Failed to unequip title', 500);
    }
  }

  async getCurrentTitle(playerId: string): Promise<string | null> {
    if (!playerId) {
      throw new AppError('Player ID is required', 400);
    }

    try {
      return await this.repo.getPlayerCurrentTitle(playerId);
    } catch (error) {
      throw new AppError('Failed to get current title', 500);
    }
  }
}

