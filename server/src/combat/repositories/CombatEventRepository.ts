// server/src/combat/repositories/CombatEventRepository.ts

import {PrismaClient, CombatLogEntry} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatEventRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  listByCombat(combatId: string): Promise<CombatLogEntry[]> {
    return this.prisma.combatLogEntry.findMany({
      where: { combatId },
      orderBy: { seq: "asc" },
    });
  }

  deleteByCombat(combatId: string): Promise<void> {
    return this.prisma.combatLogEntry.deleteMany({ where: { combatId } }).then(() => {});
  }
}
