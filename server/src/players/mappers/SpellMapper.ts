// server/src/players/mappers/SpellMapper.ts

import { Spell } from "@prisma/client";
import { SpellDto } from "shared";

export class SpellMapper {
  static fromPrisma(model: Spell): SpellDto {
    return {
      id: model.id,
      slug: model.slug,
      name: model.name,
      description: model.description,
      minLevel: model.minLevel,
      element: model.element,
      skillType: model.skillSlug,
      attackType: model.attackType,
      manaCost: model.manaCost,
      cooldown: model.cooldown,
      castTime: model.castTime,
      range: model.range,
      areaOfEffect: model.areaOfEffect,
      effect: typeof model.effect === 'string' ? model.effect : JSON.stringify(model.effect),
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
