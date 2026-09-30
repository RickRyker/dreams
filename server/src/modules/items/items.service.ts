// server/src/modules/items/items.service.ts

import { ItemType, QualityType } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { ItemsMapper } from "./items.mapper";
import { ItemsRepository } from "./items.repository";

export class ItemsService {
  constructor(
    private repository: ItemsRepository,
    private mapper: ItemsMapper,
  ) {}

  async listItems() {
    return (await this.repository.listItems()).map((item) => this.mapper.toItemDto(item));
  }

  async getItemById(itemId: string) {
    const item = await this.repository.getItemById(itemId);
    if (!item) throw new AppError("Item not found", 404);
    return this.mapper.toItemDto(item);
  }

  async listCategories() {
    return Object.values(ItemType);
  }

  async listRarities() {
    return Object.values(QualityType);
  }

  async listRecipes() {
    return (await this.repository.listRecipes()).map((recipe) => this.mapper.toRecipeDto(recipe));
  }

  async craftItem(playerId: string, recipeId: string) {
    const recipe = await this.repository.getRecipeById(recipeId);
    if (!recipe) throw new AppError("Recipe not found", 404);

    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients as Array<{ slug: string; qty: number }> : [];

    for (const ing of ingredients) {
      const ingredientItem = await this.repository.findItemBySlug(ing.slug);
      if (!ingredientItem) throw new AppError("Missing ingredients", 400);
      const count = await this.repository.countInventoryItem(playerId, ingredientItem.id);
      if (count < ing.qty) throw new AppError("Missing ingredients", 400);
    }

    for (const ing of ingredients) {
      const ingredientItem = await this.repository.findItemBySlug(ing.slug);
      if (!ingredientItem) throw new AppError("Missing ingredients", 400);
      await this.repository.decrementInventoryItems(playerId, ingredientItem.id, ing.qty);
    }

    await this.repository.createInventoryItem(playerId, recipe.resultItemId, 1);
    return { success: true };
  }
}
