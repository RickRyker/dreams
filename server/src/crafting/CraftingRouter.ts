// server/src/crafting/CraftingRouter.ts

import { Router } from 'express';
import { CraftingService } from './CraftingService';
import { BuffService } from '../buffs/BuffService';
import { requireAuth } from "../middleware/AuthMiddleware";

const router = Router();
const crafting = new CraftingService(new BuffService());
router.use(requireAuth);

router.post('/craft', async (req, res) => {
  const playerId = typeof req.body?.playerId === "string" ? req.body.playerId : null;
  if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
  const { recipeId } = req.body;
  const result = await crafting.craftRecipe(playerId, recipeId);
  res.json(result);
});

export const craftingRouter = router;
