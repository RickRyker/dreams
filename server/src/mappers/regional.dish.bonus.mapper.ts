// server/src/mappers/regional.dish.bonus.mapper.ts

import { RegionalDishBonus } from "@prisma/client";
import { RegionalDishBonusDto } from "shared";

export function toRegionalDishBonusDto(model: RegionalDishBonus): RegionalDishBonusDto {
  return {
    id: model.id,
    regionalDishId: model.regionalDishId,
    bonusCategory: model.bonusCategory,
    value: model.value,
    mythicBonus: model.mythicBonus,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toRegionalDishBonusDtoList(models: RegionalDishBonus[]): RegionalDishBonusDto[] {
  return models.map(toRegionalDishBonusDto);
}
