// server/src/players/mappers/ItemMapper.ts


import { Item } from "@prisma/client";
import { ItemDto } from "shared";

export class ItemMapper {
  static fromPrisma(model: Item): ItemDto {
    return {
      id: model.id,
      slug: model.slug,
      name: model.name,
      description: model.description,
      quality: model.quality,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
