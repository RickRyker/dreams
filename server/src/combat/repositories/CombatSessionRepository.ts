// server/src/combat/repositories/CombatSessionRepository.ts

import {PrismaClient, CombatSession} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatSessionRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  findById(id: string): Promise<CombatSession | null> {
    return this.prisma.combatSession.findUnique({ where: { id } });
  }

  getById(id: string): Promise<CombatSession | null> {
    return this.findById(id);
  }

  create(data: any): Promise<CombatSession> {
    return this.prisma.combatSession.create({ data });
  }

  update(id: string, data: any): Promise<CombatSession> {
    return this.prisma.combatSession.update({ where: { id }, data });
  }

  deleteById(id: string): Promise<void> {
    return this.prisma.combatSession.delete({ where: { id } }).then(() => {});
  }

  delete(id: string): Promise<void> {
    return this.deleteById(id);
  }
}
