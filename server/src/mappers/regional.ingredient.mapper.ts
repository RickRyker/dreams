// server/src/mappers/regional.ingredient.mapper.ts

import { RegionalIngredient } from "@prisma/client";
import { RegionalIngredientDto } from "shared";

export function toRegionalIngredientDto(model: RegionalIngredient): RegionalIngredientDto {
  return {
    regionId: model.regionId,
    ingredient: model.ingredient,
    rarity: model.rarity,
  };
}

export function toRegionalIngredientDtoList(models: RegionalIngredient[]): RegionalIngredientDto[] {
  return models.map(toRegionalIngredientDto);
}
