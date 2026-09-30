// server/src/modules/classes/ClassesRepository.ts

import {prisma} from "@prisma";
import {Prisma} from '@prisma/client';
import {ClassesMapper} from "./ClassesMapper";
import {ClassDomain, PlayerClassDomain} from "./ClassTypes";

export class ClassesRepository {
  constructor(private readonly mapper: ClassesMapper) {}

  async listAllClasses(tx?: Prisma.TransactionClient): Promise<ClassDomain[]> {
    const client = tx || prisma;
    const rows = await client.class.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        primaryStat: true,
        secondaryStat: true,
        favoredWeapon: true,
        bonuses: true,
        statGrowth: true,
        startingSpells: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return rows.map((r) => this.mapper.toClassDomain(r));
  }

  async getClassById(classId: string, tx?: Prisma.TransactionClient): Promise<ClassDomain | null> {
    const client = tx || prisma;
    const row = await client.class.findUnique({
      where: { id: classId },
      select: {
        id: true,
        name: true,
        description: true,
        primaryStat: true,
        secondaryStat: true,
        favoredWeapon: true,
        bonuses: true,
        statGrowth: true,
        startingSpells: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return row ? this.mapper.toClassDomain(row) : null;
  }

  async getPlayerClass(playerId: string, tx?: Prisma.TransactionClient): Promise<PlayerClassDomain | null> {
    const client = tx || prisma;
    const row = await client.playerClass.findFirst({
      where: { playerId },
      select: {
        id: true,
        playerId: true,
        classId: true,
        class: {
          select: {
            id: true,
            name: true,
            description: true,
            primaryStat: true,
            secondaryStat: true,
            favoredWeapon: true,
            bonuses: true,
            statGrowth: true,
            startingSpells: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return row ? this.mapper.toPlayerClassDomain(row) : null;
  }

  async assignClass(playerId: string, classId: string, tx?: Prisma.TransactionClient): Promise<PlayerClassDomain> {
    const client = tx || prisma;

    const row: any = await client.playerClass.upsert({
      where: {
        playerId_classId: { playerId, classId }
      },
      update: {}, // nothing to update; class already assigned
      create: { playerId, classId },
      select: {
        id: true,
        playerId: true,
        classId: true,
        class: {
          select: {
            id: true,
            name: true,
            description: true,
            primaryStat: true,
            secondaryStat: true,
            favoredWeapon: true,
            bonuses: true,
            statGrowth: true,
            startingSpells: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });

    return this.mapper.toPlayerClassDomain(row);
  }

  async listPlayerClasses(playerId: string, tx?: Prisma.TransactionClient): Promise<ClassDomain[]> {
    const client = tx || prisma;
    const rows = await client.playerClass.findMany({
      where: { playerId },
      select: {
        class: {
          select: {
            id: true,
            name: true,
            description: true,
            primaryStat: true,
            secondaryStat: true,
            favoredWeapon: true,
            bonuses: true,
            statGrowth: true,
            startingSpells: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return rows.map((r) => this.mapper.toClassDomain(r.class));
  }

  async removePlayerClass(playerId: string, classId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.playerClass.deleteMany({
      where: { playerId, classId },
    });
  }

}
