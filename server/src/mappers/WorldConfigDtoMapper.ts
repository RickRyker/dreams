// server/src/mappers/WorldConfigDtoMapper.ts

import { WorldConfig } from "@prisma/client";
import { WorldConfigDto } from "shared";

export function toWorldConfigDto(model: WorldConfig): WorldConfigDto {
  return {
    id: model.id,
    name: model.name,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toWorldConfigDtoList(models: WorldConfig[]): WorldConfigDto[] {
  return models.map(toWorldConfigDto);
}
