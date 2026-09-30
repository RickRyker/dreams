// server/src/modules/skills/types.ts

import { Skill, PlayerSkill } from '@prisma/client';

export interface SkillDTO {
  id: string;
  name: string;
  description?: string | null;
}

export interface PlayerSkillDTO {
  id: string;
  playerId: string;
  skillId: string;
  points: number;
  level: number;
  skill: SkillDTO;
}

export interface AddSkillXpRequest {
  skillId: string;
  amount: number;
}

export interface SkillLevelUpEvent {
  playerId: string;
  skillId: string;
  newLevel: number;
  totalXp: number;
}
