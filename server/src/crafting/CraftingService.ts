// server/src/crafting/CraftingService.ts

import {prisma} from "@prisma";
import { BuffService } from '../buffs/BuffService';

export class CraftingService {
  constructor(private buffs: BuffService) {}

  async craftRecipe(playerId: string, recipeId: string) {
    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe) throw new Error('Recipe not found');

    const baseXp = this.getBaseCraftXp(recipe);

    const finalXp = await this.buffs.applyXpGain(playerId, baseXp);

    await prisma.playerStats.update({
      where: { playerId },
      data: { experience: { increment: finalXp } },
    });

    // …consume ingredients, create result item, etc.

    return { baseXp, finalXp };
  }

  private getBaseCraftXp(recipe: { difficulty: number }) {
    return 10 + recipe.difficulty * 2;
  }
}
