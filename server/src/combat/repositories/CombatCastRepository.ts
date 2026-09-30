// server/src/combat/repositories/CombatCastRepository.ts

import {PrismaClient, CombatCast} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatCastRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async findById(id: string): Promise<CombatCast | null> {
    return this.prisma.combatCast.findUnique({ where: { id } });
  }

  async listByCombat(combatId: string): Promise<CombatCast[]> {
    return this.prisma.combatCast.findMany({ where: { combatId } });
  }

  async listByCaster(casterId: string): Promise<CombatCast[]> {
    return this.prisma.combatCast.findMany({ where: { casterId } });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.combatCast.delete({ where: { id } });
  }

  async create(data: Omit<CombatCast, "id" | "createdAt" | "updatedAt">): Promise<CombatCast> {
    return this.prisma.combatCast.create({ data });
  }
}
