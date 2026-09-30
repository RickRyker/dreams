// server/src/mappers/region.dto.mapper.ts

import { Region } from "@prisma/client";
import { RegionDto } from "shared";

export function toRegionDto(model: Region): RegionDto {
  return {
    id: model.id,
    slug: model.slug,
    name: model.name,
    description: model.name,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toRegionDtoList(models: Region[]): RegionDto[] {
  return models.map(toRegionDto);
}
