// server/src/modules/monsters/monsters.service.ts

import { prisma } from "@prisma";
import { AppError } from '../../errors/AppError.js';

export const listMonsters = async () => {
  return prisma.monster.findMany({
    include: {
      monsterType: true,
      loot: {
        include: {
          item: true
        }
      }
    }
  });
};

export const getMonsterById = async (monsterId: string) => {
  return prisma.monster.findUnique({
    where: { id: monsterId },
    include: {
      monsterType: true,
      loot: {
        include: {
          item: true
        }
      },
      abilities: {
        include: {
          ability: true
        }
      }
    }
  });
};

export const listMonsterTypes = async () => {
  return prisma.monsterType.findMany();
};

export const listMonsterSpawns = async (monsterId: string) => {
  return [];
};

export const listMonsterDrops = async (monsterId: string) => {
  return prisma.monsterLootTable.findMany({
    where: { monsterId },
    include: {
      item: true
    }
  });
};
