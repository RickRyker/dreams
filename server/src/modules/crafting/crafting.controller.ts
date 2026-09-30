// server/src/modules/crafting/crafting.controller.ts

import { Request, Response } from 'express';
import { CraftingService } from './crafting.service';
import { craftItemSchema, learnRecipeSchema } from './crafting.schema';

export class CraftingController {
  constructor(private service: CraftingService) {}

  private getPlayerId(req: Request): string | null {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (paramPlayerId) return paramPlayerId;

    const body = req.body as { playerId?: unknown } | undefined;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  craft = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { recipeId } = craftItemSchema.parse(req.body);
    await this.service.craftItem(playerId, recipeId);
    res.status(204).send();
  };

  learnRecipe = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { recipeId } = learnRecipeSchema.parse(req.body);
    const pr = await this.service.learnRecipe(playerId, recipeId);
    res.status(201).json(pr);
  };

  myRecipes = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const recipes = await this.service.listKnownRecipes(playerId);
    res.json(recipes);
  };

  allRecipes = async (_req: Request, res: Response) => {
    const recipes = await this.service.listAllRecipes();
    res.json(recipes);
  };
}
