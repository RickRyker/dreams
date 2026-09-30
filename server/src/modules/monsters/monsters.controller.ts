// server/src/modules/monsters/monsters.controller.ts

import {
  listMonsters,
  getMonsterById,
  listMonsterTypes,
  listMonsterSpawns,
  listMonsterDrops
} from './monsters.service.js';
import { AppError } from '../../errors/AppError.js';

export const listMonstersController = async () => listMonsters();

export const getMonsterController = async (monsterId: string) => {
  const m = await getMonsterById(monsterId);
  if (!m) throw new AppError('Monster not found', 404);
  return m;
};

export const listMonsterTypesController = async () => listMonsterTypes();

export const listMonsterSpawnsController = async (monsterId: string) =>
  listMonsterSpawns(monsterId);

export const listMonsterDropsController = async (monsterId: string) =>
  listMonsterDrops(monsterId);
