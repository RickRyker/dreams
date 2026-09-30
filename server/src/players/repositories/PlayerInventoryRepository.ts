// server/src/players/repositories/PlayerInventoryRepository.ts

import { prisma } from "@prisma";
import { InventoryItem } from "@prisma/client";

export class PlayerInventoryRepository {
  async addItem(playerId: string, itemId: string, quantity: number): Promise<InventoryItem> {
    return this.add(playerId, itemId, quantity);
  }

  async add(playerId: string, itemId: string, quantity: number): Promise<InventoryItem> {
    const existing = await prisma.inventoryItem.findFirst({
      where: { playerId, itemId }
    });

    if (existing) {
      return prisma.inventoryItem.update({
        where: { id: existing.id },
        data: { quantity: { increment: quantity } }
      });
    }

    return prisma.inventoryItem.create({
      data: { playerId, itemId, quantity }
    });
  }

  async remove(playerId: string, itemId: string, quantity: number) {
    const existing = await prisma.inventoryItem.findFirst({
      where: { playerId, itemId }
    });

    if (!existing) {
      throw new Error('Inventory item not found');
    }

    return prisma.inventoryItem.update({
      where: { id: existing.id },
      data: { quantity: { decrement: quantity } }
    });
  }

  async fetch(playerId: string, itemSlug: string): Promise<InventoryItem[]> {
    return prisma.inventoryItem.findMany({
      where: { playerId, item: { slug: itemSlug } },
      include: { item: true }
    })
  }

  async list(playerId: string) {
    return prisma.inventoryItem.findMany({
      where: { playerId },
      include: { item: true },
    })
  }

  async update(id: string, quantity: number): Promise<InventoryItem> {
    return prisma.inventoryItem.update({
      where: { id },
      data: { quantity },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.inventoryItem.delete({ where: { id } });
  }

  async get(id: string): Promise<InventoryItem | null> {
    return prisma.inventoryItem.findUnique({
      where: { id },
      include: { item: true },
    });
  };

}
