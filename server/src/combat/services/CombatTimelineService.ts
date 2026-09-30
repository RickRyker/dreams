// server/src/combat/services/CombatTimelineService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatTimelineService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async getTimeline(combatId: string) {
    return this.prisma.combatTimelineEvent.findMany({
      where: {combatId},
      orderBy: {timestamp: "asc"},
    });
  }

  async resetTimeline(combatId: string) {
    await this.prisma.combatTimelineEvent.deleteMany({where: {combatId}});
  }
}
