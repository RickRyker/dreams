// server/src/modules/items/items.mapper.ts

import type { Item, Recipe } from "@prisma/client";

export class ItemsMapper {
  toItemDto(model: Item) {
    return model;
  }

  toRecipeDto(model: Recipe) {
    return model;
  }
}
