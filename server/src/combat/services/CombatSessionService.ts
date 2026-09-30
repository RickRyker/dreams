// server/src/combat/services/CombatSessionService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatSessionService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getSession(id: string) {
    return this.prisma.combatSession.findUnique({where: {id}});
  }

  async deleteSession(id: string) {
    await this.prisma.combatSession.delete({where: {id}});
  }
}
