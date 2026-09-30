// server/src/combat/repositories/CombatSnapshotRepository.ts

import {PrismaClient, CombatSnapshot} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatSnapshotRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  listByCombat(combatId: string): Promise<CombatSnapshot[]> {
    return this.prisma.combatSnapshot.findMany({
      where: { combatId },
      orderBy: { timestamp: "asc" },
    });
  }

  findById(id: string): Promise<CombatSnapshot | null> {
    return this.prisma.combatSnapshot.findUnique({ where: { id } });
  }

  deleteByCombat(combatId: string): Promise<void> {
    return this.prisma.combatSnapshot.deleteMany({ where: { combatId } }).then(() => {});
  }
}
