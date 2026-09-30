// server/src/combat/services/CombatLootService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatLootService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getLoot(id: string) {
    return this.prisma.combatLoot.findUnique({where: {id}});
  }

  async listByParticipant(participantId: string) {
    return this.prisma.combatLoot.findMany({where: {participantId}});
  }

  async deleteLoot(id: string) {
    await this.prisma.combatLoot.delete({where: {id}});
  }
}
