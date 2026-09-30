// server/src/combat/services/CombatThreatService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatThreatService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getThreat(id: string) {
    return this.prisma.combatThreat.findUnique({where: {id}});
  }

  async listByCombat(combatId: string) {
    return this.prisma.combatThreat.findMany({where: {combatId}});
  }

  async listByMonster(monsterId: string) {
    return this.prisma.combatThreat.findMany({where: {monsterId}});
  }

  async listByTarget(targetId: string) {
    return this.prisma.combatThreat.findMany({where: {targetId}});
  }

  async deleteThreat(id: string) {
    await this.prisma.combatThreat.delete({where: {id}});
  }
}
