// server/src/mappers/profanity.pattern.dto.mapper.ts

import { ProfanityPattern } from "@prisma/client";
import { ProfanityPatternDto } from "shared";

export function toProfanityPatternDto(model: ProfanityPattern): ProfanityPatternDto {
  return {
    id: model.id,
    pattern: model.pattern,
    severity: model.severity,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toProfanityPatternDtoList(models: ProfanityPattern[]): ProfanityPatternDto[] {
  return models.map(toProfanityPatternDto);
}
