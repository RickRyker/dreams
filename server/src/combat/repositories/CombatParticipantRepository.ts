// server/src/combat/repositories/CombatParticipantRepository.ts

import {PrismaClient, CombatParticipant} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatParticipantRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  listByCombat(combatId: string): Promise<CombatParticipant[]> {
    return this.prisma.combatParticipant.findMany({ where: { combatId } });
  }

  findById(id: string): Promise<CombatParticipant | null> {
    return this.prisma.combatParticipant.findUnique({ where: { id } });
  }

  deleteById(id: string): Promise<void> {
    return this.prisma.combatParticipant.delete({ where: { id } }).then(() => {});
  }

  deleteByCombat(combatId: string): Promise<void> {
    return this.prisma.combatParticipant.deleteMany({ where: { combatId } }).then(() => {});
  }
}
