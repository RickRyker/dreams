// server/src/mappers/regional.dish.mapper.ts

import { RegionalDish } from "@prisma/client";
import { RegionalDishDto } from "shared";

export function toRegionalDishDto(model: RegionalDish): RegionalDishDto {
  return {
    id: model.id,
    regionId: model.regionId,
    dish: model.dish,
    rarity: model.rarity,
    bonusDuration: model.bonusDuration,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toRegionalDishDtoList(models: RegionalDish[]): RegionalDishDto[] {
  return models.map(toRegionalDishDto);
}
