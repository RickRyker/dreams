// server/src/combat/services/CombatSnapshotService.ts

import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatSnapshotService {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async listSnapshots(combatId: string) {
    return this.prisma.combatSnapshot.findMany({
      where: {combatId},
      orderBy: {timestamp: "asc"},
    });
  }

  async getSnapshot(id: string) {
    return this.prisma.combatSnapshot.findUnique({where: {id}});
  }

  async deleteSnapshots(combatId: string) {
    await this.prisma.combatSnapshot.deleteMany({where: {combatId}});
  }
}
