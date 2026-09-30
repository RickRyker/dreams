// server/src/players/mappers/SkillMapper.ts

import { PlayerSkill } from "@prisma/client";
import { SkillDto } from "shared";

export class SkillMapper {
  static fromPrisma(model: PlayerSkill & { skill?: { name: string } | null }): SkillDto {
    return {
      id: model.id,
      name: model.skill?.name ?? model.skillId,
      level: model.level,
    };
  }
}
