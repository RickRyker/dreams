// server/src/modules/items/items.repository.ts

import { Item, Prisma, Recipe } from "@prisma/client";
import { prisma } from "@prisma";

export class ItemsRepository {
  async listItems(tx?: Prisma.TransactionClient): Promise<Item[]> {
    const client = tx || prisma;
    return client.item.findMany();
  }

  async getItemById(itemId: string, tx?: Prisma.TransactionClient): Promise<Item | null> {
    const client = tx || prisma;
    return client.item.findUnique({ where: { id: itemId } });
  }

  async findItemBySlug(slug: string, tx?: Prisma.TransactionClient): Promise<Item | null> {
    const client = tx || prisma;
    return client.item.findUnique({ where: { slug } });
  }

  async listRecipes(tx?: Prisma.TransactionClient): Promise<Recipe[]> {
    const client = tx || prisma;
    return client.recipe.findMany({
      include: {
        resultItem: true,
      },
    });
  }

  async getRecipeById(recipeId: string, tx?: Prisma.TransactionClient): Promise<Recipe | null> {
    const client = tx || prisma;
    return client.recipe.findUnique({
      where: { id: recipeId },
      include: {
        resultItem: true,
      },
    });
  }

  async countInventoryItem(playerId: string, itemId: string, tx?: Prisma.TransactionClient): Promise<number> {
    const client = tx || prisma;
    return client.inventoryItem.count({
      where: { playerId, itemId },
    });
  }

  async decrementInventoryItems(playerId: string, itemId: string, quantity: number, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx || prisma;
    await client.inventoryItem.updateMany({
      where: { playerId, itemId },
      data: { quantity: { decrement: quantity } },
    });
  }

  async createInventoryItem(playerId: string, itemId: string, quantity: number, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx || prisma;
    await client.inventoryItem.create({
      data: {
        playerId,
        itemId,
        quantity,
      },
    });
  }
}
