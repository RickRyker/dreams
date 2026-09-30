// server/src/modules/crafting/crafting.service.ts

import { PrismaClient } from '@prisma/client';

export class CraftingService {
  constructor(private prisma: PrismaClient) {}

  async craftItem(playerId: string, recipeId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: { resultItem: true }
    });
    if (!recipe) throw new Error('Recipe not found');

    // TODO: check player has recipe (PlayerRecipe) or allow discovery
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
      include: { inventory: { include: { item: true } } }
    });
    if (!player) throw new Error('Player not found');

    const ingredients = recipe.ingredients as any[];
    // Very naive ingredient check/removal
    for (const ing of ingredients) {
      const inv = player.inventory.find(i => i.item.slug === ing.slug && i.quantity >= ing.qty);
      if (!inv) throw new Error('Missing ingredients');
    }

    await this.prisma.$transaction(async tx => {
      for (const ing of ingredients) {
        const inv = player.inventory.find(i => i.item.slug === ing.slug)!;
        if (inv.quantity === ing.qty) {
          await tx.inventoryItem.delete({ where: { id: inv.id } });
        } else {
          await tx.inventoryItem.update({
            where: { id: inv.id },
            data: { quantity: { decrement: ing.qty } }
          });
        }
      }

      await tx.inventoryItem.create({
        data: {
          itemId: recipe.resultItemId,
          quantity: 1,
          isDroppable: true,
          isTradeable: true,
          playerId
        }
      });

      // track activity for clients
      await tx.playerActivity.upsert({
        where: { playerId_activityType: { playerId, activityType: 'RECIPE_CRAFTED' } },
        update: { count: { increment: 1 }, timestamp: new Date() },
        create: {
          playerId,
          activityType: 'RECIPE_CRAFTED',
          activityData: { recipeId },
          count: 1
        }
      });
    });
  }

  learnRecipe(playerId: string, recipeId: string) {
    return this.prisma.playerRecipe.upsert({
      where: { playerId_recipeId: { playerId, recipeId } },
      update: {},
      create: { playerId, recipeId }
    });
  }

  listKnownRecipes(playerId: string) {
    return this.prisma.playerRecipe.findMany({
      where: { playerId },
      include: { recipe: { include: { resultItem: true } } }
    });
  }

  listAllRecipes() {
    return this.prisma.recipe.findMany({
      include: { resultItem: true }
    });
  }
}
