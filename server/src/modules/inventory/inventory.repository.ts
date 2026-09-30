// server/src/modules/inventory/inventory.repository.ts

import { Container, InventoryItem, PlayerEquipment, Prisma, SlotType } from "@prisma/client";
import { prisma } from "@prisma";

export class InventoryRepository {
  async getPlayerInventory(playerId: string, tx?: Prisma.TransactionClient): Promise<(InventoryItem & { item: unknown })[]> {
    const client = tx || prisma;
    return client.inventoryItem.findMany({
      where: { playerId },
      include: {
        item: true,
      },
    });
  }

  async getPlayerEquipment(playerId: string, tx?: Prisma.TransactionClient): Promise<(PlayerEquipment & { item: (InventoryItem & { item: unknown }) | null })[]> {
    const client = tx || prisma;
    return client.playerEquipment.findMany({
      where: { playerId },
      include: {
        item: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findInventoryItem(inventoryItemId: string, tx?: Prisma.TransactionClient): Promise<(InventoryItem & { player: { mapId: string | null } | null }) | null> {
    const client = tx || prisma;
    return client.inventoryItem.findUnique({
      where: { id: inventoryItemId },
      include: {
        player: {
          select: {
            mapId: true,
          },
        },
      },
    });
  }

  async upsertPlayerEquipment(playerId: string, slot: string, inventoryItemId: string, tx?: Prisma.TransactionClient): Promise<PlayerEquipment> {
    const client = tx || prisma;
    return client.playerEquipment.upsert({
      where: {
        playerId_slotType: {
          playerId,
          slotType: slot as SlotType,
        },
      },
      update: {
        itemId: inventoryItemId,
      },
      create: {
        playerId,
        slotType: slot as SlotType,
        itemId: inventoryItemId,
      },
    });
  }

  async clearPlayerEquipment(playerId: string, slot: string, tx?: Prisma.TransactionClient): Promise<PlayerEquipment> {
    const client = tx || prisma;
    return client.playerEquipment.update({
      where: {
        playerId_slotType: {
          playerId,
          slotType: slot as SlotType,
        },
      },
      data: {
        itemId: null,
      },
    });
  }

  async createDroppedContainer(mapId: string | null, tx?: Prisma.TransactionClient): Promise<Container> {
    const client = tx || prisma;
    return client.container.create({
      data: {
        name: "Dropped Loot",
        capacity: 9999,
        slots: 9999,
        x: 0,
        y: 0,
        mapId,
      },
    });
  }

  async updateInventoryItem(inventoryItemId: string, data: { containerId: string | null; playerId: string | null }, tx?: Prisma.TransactionClient): Promise<InventoryItem> {
    const client = tx || prisma;
    return client.inventoryItem.update({
      where: { id: inventoryItemId },
      data,
    });
  }
}
