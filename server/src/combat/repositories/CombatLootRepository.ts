// server/src/combat/repositories/CombatLootRepository.ts

import {PrismaClient, CombatLoot} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatLootRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  findById(id: string): Promise<CombatLoot | null> {
    return this.prisma.combatLoot.findUnique({ where: { id } });
  }

  listByParticipant(participantId: string): Promise<CombatLoot[]> {
    return this.prisma.combatLoot.findMany({ where: { participantId } });
  }

  deleteById(id: string): Promise<void> {
    return this.prisma.combatLoot.delete({ where: { id } }).then(() => {});
  }
}
