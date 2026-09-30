// server/src/modules/crafting/crafting.router.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { CraftingService } from './crafting.service';
import { CraftingController } from './crafting.controller';
import { requireAuth } from '../../middleware/auth';

export function createCraftingRouter(prisma: PrismaClient): Router {
  const router = Router();
  const service = new CraftingService(prisma);
  const controller = new CraftingController(service);

  router.use(requireAuth);

  router.post('/players/:playerId/craft', controller.craft);
  router.post('/players/:playerId/recipes/learn', controller.learnRecipe);
  router.get('/players/:playerId/recipes', controller.myRecipes);
  router.get('/recipes', controller.allRecipes);

  return router;
}
