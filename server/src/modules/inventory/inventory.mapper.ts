// server/src/modules/inventory/inventory.mapper.ts

import type { InventoryItem, PlayerEquipment } from "@prisma/client";

export class InventoryMapper {
  toInventoryItemDto(model: InventoryItem & { item: unknown }) {
    return model;
  }

  toPlayerEquipmentDto(model: PlayerEquipment & { item: (InventoryItem & { item: unknown }) | null }) {
    return model;
  }
}
