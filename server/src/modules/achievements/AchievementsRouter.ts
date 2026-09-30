// server/src/modules/achievements/AchievementsRouter.ts

import { Router } from "express";
import { prisma } from "@prisma";
import { authMiddleware } from "../../auth/middleware.js";
import {
  unlockAchievementBodySchema,
  listAchievementsQuerySchema,
  leaderboardQuerySchema
} from "./AchievementsSchema";
import { AchievementsService } from "./AchievementsService.js";
import {
  listAchievementsController,
  leaderboardController,
  previewAchievementController,
  unlockAchievementController,
  categoriesController,
  tiersController
} from "./AchievementsController";

export function createAchievementsRouter() {
  const router = Router();
  const service = new AchievementsService(prisma);

  router.use(authMiddleware);

  router.get("/", async (req, res) => res.json(await listAchievementsController(listAchievementsQuerySchema.parse(req.query))));
  router.get("/leaderboard", async (req, res) => res.json(await leaderboardController(leaderboardQuerySchema.parse(req.query))));
  router.get("/:achievementId/preview", async (req, res) => res.json(await previewAchievementController({ achievementId: req.params.achievementId })));
  router.post("/:achievementId/unlock", async (req, res, next) => {
    try {
      const parsed = unlockAchievementBodySchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      return res.json(await unlockAchievementController({ achievementId: req.params.achievementId }, parsed.data));
    } catch (error) {
      return next(error);
    }
  });
  router.get("/meta/categories", async (_req, res) => res.json(await categoriesController()));
  router.get("/meta/tiers", async (_req, res) => res.json(await tiersController()));

  return router;
}

export const achievementsRouter = createAchievementsRouter();
