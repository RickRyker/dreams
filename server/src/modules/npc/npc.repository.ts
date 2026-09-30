// server/src/modules/npc/npc.repository.ts

import { prisma } from "@prisma";
import { Prisma } from "@prisma/client";

export class NpcRepository {
  async listNpcs(tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.npcStore.findMany({
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async getNpcById(npcId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.npcStore.findUnique({
      where: { id: npcId },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async getShopItem(npcId: string, itemId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.npcStoreItem.findFirst({
      where: { storeId: npcId, itemId },
      include: { item: true },
    });
  }

  async decrementGold(playerId: string, amount: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.playerStats.update({
      where: { playerId },
      data: { gold: { decrement: amount } },
    });
  }

  async incrementGold(playerId: string, amount: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.playerStats.update({
      where: { playerId },
      data: { gold: { increment: amount } },
    });
  }

  async createInventoryItem(playerId: string, itemId: string, quantity: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.inventoryItem.create({
      data: {
        playerId,
        itemId,
        quantity,
      },
    });
  }

  async getInventoryItem(inventoryItemId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.inventoryItem.findUnique({ where: { id: inventoryItemId } });
  }

  async decrementInventory(playerId: string, inventoryItemId: string, quantity: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.inventoryItem.update({
      where: { id: inventoryItemId },
      data: { quantity: { decrement: quantity } },
    });
  }
}
