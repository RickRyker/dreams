// server/src/modules/skills/skills.service.ts

import { SkillsService as SkillsServiceClass } from "./SkillsService";
import { SkillsRepository } from "./SkillsRepository";

const service = new SkillsServiceClass(new SkillsRepository());

export const listSkills = async () => service.listAllSkills();
export const getSkillById = async (skillId: string) => service.getSkillById(skillId);
export const listPlayerSkills = async (playerId: string) => service.listPlayerSkills(playerId);
export const addSkillXp = async (playerId: string, skillId: string, amount: number) =>
  service.addSkillXp(playerId, skillId, amount);

export { SkillsService } from "./SkillsService";
