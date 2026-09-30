// server/src/combat/repositories/CombatTimelineRepository.ts

import {PrismaClient, CombatTimelineEvent} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatTimelineRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  listByCombat(combatId: string): Promise<CombatTimelineEvent[]> {
    return this.prisma.combatTimelineEvent.findMany({
      where: { combatId },
      orderBy: { timestamp: "asc" },
    });
  }

  deleteByCombat(combatId: string): Promise<void> {
    return this.prisma.combatTimelineEvent.deleteMany({ where: { combatId } }).then(() => {});
  }
}
