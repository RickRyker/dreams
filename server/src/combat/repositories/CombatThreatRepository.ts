// server/src/combat/repositories/CombatThreatRepository.ts

import {PrismaClient, CombatThreat} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatThreatRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  findById(id: string): Promise<CombatThreat | null> {
    return this.prisma.combatThreat.findUnique({ where: { id } });
  }

  listByCombat(combatId: string): Promise<CombatThreat[]> {
    return this.prisma.combatThreat.findMany({ where: { combatId } });
  }

  listByMonster(monsterId: string): Promise<CombatThreat[]> {
    return this.prisma.combatThreat.findMany({ where: { monsterId } });
  }

  listByTarget(targetId: string): Promise<CombatThreat[]> {
    return this.prisma.combatThreat.findMany({ where: { targetId } });
  }

  deleteById(id: string): Promise<void> {
    return this.prisma.combatThreat.delete({ where: { id } }).then(() => {});
  }
}
