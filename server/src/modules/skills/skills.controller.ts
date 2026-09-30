// server/src/modules/skills/skills.controller.ts

import {
  listSkills,
  getSkillById,
  listPlayerSkills,
  addSkillXp
} from './skills.service.js';
import { AppError } from '../../errors/AppError.js';

export const listSkillsController = async () => listSkills();

export const getSkillController = async (skillId: string) => {
  const skill = await getSkillById(skillId);
  if (!skill) throw new AppError('Skill not found', 404);
  return skill;
};

export const listPlayerSkillsController = async (playerId: string) =>
  listPlayerSkills(playerId);

export const addSkillXpController = async (playerId: string, skillId: string, amount: number) =>
  addSkillXp(playerId, skillId, amount);
