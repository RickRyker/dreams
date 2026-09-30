// server/src/combat/services/CombatReplayService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatReplayService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getReplay(combatId: string) {
    return this.prisma.combatReplay.findUnique({where: {combatId}});
  }

  async deleteReplay(combatId: string) {
    await this.prisma.combatReplay.delete({where: {combatId}});
  }
}
