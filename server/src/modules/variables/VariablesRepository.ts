// server/src/modules/variables/VariablesRepository.ts

import { Prisma } from '@prisma/client';
import { prisma } from "@prisma";
import { VariableDTO } from './types.js';

export class VariablesRepository {
  private toDto(variable: { id: string; playerId: string; key: string; value: string | null }): VariableDTO {
    return {
      id: variable.id,
      playerId: variable.playerId,
      name: variable.key,
      value: variable.value
    };
  }

  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listPlayerVariables(playerId: string, tx?: Prisma.TransactionClient): Promise<VariableDTO[]> {
    const client = tx || prisma;
    const variables = await client.playerVariable.findMany({
      where: { playerId }
    });
    return variables.map((variable) => this.toDto(variable));
  }

  async getVariable(playerId: string, name: string, tx?: Prisma.TransactionClient): Promise<VariableDTO | null> {
    const client = tx || prisma;
    const variable = await client.playerVariable.findUnique({
      where: { playerId_key: { playerId, key: name } }
    });
    return variable ? this.toDto(variable) : null;
  }

  async setVariable(playerId: string, name: string, value: string | null, tx?: Prisma.TransactionClient): Promise<VariableDTO> {
    const client = tx || prisma;
    const variable = await client.playerVariable.upsert({
      where: { playerId_key: { playerId, key: name } },
      update: { value: value ?? "" },
      create: { playerId, key: name, value: value ?? "" }
    });
    return this.toDto(variable);
  }

  async deleteVariable(playerId: string, name: string, tx?: Prisma.TransactionClient): Promise<VariableDTO> {
    const client = tx || prisma;
    const variable = await client.playerVariable.delete({
      where: { playerId_key: { playerId, key: name } }
    });
    return this.toDto(variable);
  }
}
