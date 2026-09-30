// server/src/mappers/spell.mapper.ts

import {Spell} from "@prisma/client";
import type {SpellDto} from "shared";

export function toSpellDto(model: Spell): SpellDto {
  return {
    id: model.id,
    slug: model.slug,
    name: model.name,
    description: model.description,
    minLevel: model.minLevel,
    element: model.element,
    skillType: (model as any).skillType ?? (model as any).skillSlug ?? null,
    attackType: model.attackType,
    manaCost: model.manaCost,
    cooldown: model.cooldown,
    castTime: model.castTime,
    range: model.range,
    areaOfEffect: (model as any).areaOfEffect ?? 0,
    effect: JSON.stringify(model.effect),
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toSpellDtoList(models: Spell[]): SpellDto[] {
  return models.map(toSpellDto);
}
