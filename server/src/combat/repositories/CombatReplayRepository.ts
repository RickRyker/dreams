// server/src/combat/repositories/CombatReplayRepository.ts

import {PrismaClient, CombatReplay} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatReplayRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  findByCombatId(combatId: string): Promise<CombatReplay | null> {
    return this.prisma.combatReplay.findUnique({ where: { combatId } });
  }

  deleteByCombatId(combatId: string): Promise<void> {
    return this.prisma.combatReplay.delete({ where: { combatId } }).then(() => {});
  }
}
