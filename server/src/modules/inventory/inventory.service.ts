// server/src/modules/inventory/inventory.service.ts

import { AppError } from "../../errors/AppError";
import { InventoryMapper } from "./inventory.mapper";
import { InventoryRepository } from "./inventory.repository";

export class InventoryService {
  constructor(
    private repository: InventoryRepository,
    private mapper: InventoryMapper,
  ) {}

  async getPlayerInventory(playerId: string) {
    const items = await this.repository.getPlayerInventory(playerId);
    return items.map((item) => this.mapper.toInventoryItemDto(item));
  }

  async getPlayerEquipment(playerId: string) {
    const equipment = await this.repository.getPlayerEquipment(playerId);
    return equipment.map((entry) => this.mapper.toPlayerEquipmentDto(entry));
  }

  async equipItem(playerId: string, inventoryItemId: string, slot: string) {
    const inv = await this.repository.findInventoryItem(inventoryItemId);
    if (!inv) throw new AppError("Item not found", 404);
    if (inv.playerId !== playerId) throw new AppError("Forbidden", 403);

    const equipped = await this.repository.upsertPlayerEquipment(playerId, slot, inventoryItemId);
    return equipped;
  }

  async unequipItem(playerId: string, slot: string) {
    return this.repository.clearPlayerEquipment(playerId, slot);
  }

  async moveItem(
    playerId: string,
    inventoryItemId: string,
    targetContainerId: string | null,
    targetPlayerId: string | null,
    quantity: number,
  ) {
    const item = await this.repository.findInventoryItem(inventoryItemId);
    if (!item) throw new AppError("Item not found", 404);
    if (item.playerId !== playerId) throw new AppError("Forbidden", 403);
    if (item.quantity < quantity) throw new AppError("Not enough quantity", 400);

    return this.repository.updateInventoryItem(inventoryItemId, {
      containerId: targetContainerId,
      playerId: targetPlayerId,
    });
  }

  async dropItem(playerId: string, inventoryItemId: string, quantity: number) {
    const item = await this.repository.findInventoryItem(inventoryItemId);
    if (!item) throw new AppError("Item not found", 404);
    if (item.playerId !== playerId) throw new AppError("Forbidden", 403);

    const container = await this.repository.createDroppedContainer(item.player?.mapId ?? null);
    return this.repository.updateInventoryItem(inventoryItemId, {
      containerId: container.id,
      playerId: null,
    });
  }

  async pickupItem(playerId: string, containerId: string, inventoryItemId: string, quantity: number) {
    const item = await this.repository.findInventoryItem(inventoryItemId);
    if (!item) throw new AppError("Item not found", 404);
    if (item.containerId !== containerId) throw new AppError("Forbidden", 403);

    return this.repository.updateInventoryItem(inventoryItemId, {
      containerId: null,
      playerId,
    });
  }
}
