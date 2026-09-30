// server/src/players/mappers/InventoryItemMapper.ts


import { InventoryItemDto } from "shared";

export class InventoryItemMapper {
  static fromPrisma(model: any): InventoryItemDto {
    return {
      id: model.id,
      itemId: model.itemId,
      quantity: model.quantity,
      isBroken: model.isBroken,
      isDroppable: model.isDroppable,
      isEquipped: model.isEquipped,
      isTradeable: model.isTradeable,
      degradation: model.degradation,
      tier: model.tier,
      quality: model.quality,
      containerId: model.containerId,
      containerType: model.containerType,
      playerId: model.playerId,
      equippedSlot: model.equippedSlot,
      guildTagId: model.guildTagId,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
