// server/src/modules/variables/VariablesService.ts

import { AppError } from '../../errors/AppError.js';
import { VariablesRepository } from './VariablesRepository.js';
import { VariableDTO } from './types.js';

export class VariablesService {
  constructor(private repo: VariablesRepository) {}

  async listPlayerVariables(playerId: string): Promise<VariableDTO[]> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    try {
      return await this.repo.listPlayerVariables(playerId);
    } catch (error) {
      throw new AppError('Failed to list variables', 500);
    }
  }

  async getVariable(playerId: string, name: string): Promise<VariableDTO | null> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!name) throw new AppError('Variable name is required', 400);
    try {
      return await this.repo.getVariable(playerId, name);
    } catch (error) {
      throw new AppError('Failed to get variable', 500);
    }
  }

  async setVariable(playerId: string, name: string, value: string | null): Promise<VariableDTO> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!name) throw new AppError('Variable name is required', 400);
    try {
      return await this.repo.setVariable(playerId, name, value);
    } catch (error: any) {
      if (error.code === 'P2025') throw new AppError('Player not found', 404);
      throw new AppError('Failed to set variable', 500);
    }
  }

  async deleteVariable(playerId: string, name: string): Promise<VariableDTO> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!name) throw new AppError('Variable name is required', 400);
    try {
      return await this.repo.deleteVariable(playerId, name);
    } catch (error: any) {
      if (error.code === 'P2025') throw new AppError('Variable not found', 404);
      throw new AppError('Failed to delete variable', 500);
    }
  }
}

