// server/src/modules/achievement-progress/achievement-progress.router.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AchievementProgressService } from './achievement-progress.service';
import { AchievementProgressController } from './achievement-progress.controller';
import { requireAuth } from '../../middleware/auth';

export function createAchievementProgressRouter(prisma: PrismaClient): Router {
  const router = Router();
  const service = new AchievementProgressService(prisma);
  const controller = new AchievementProgressController(service);

  router.use(requireAuth);
  router.post('/players/:playerId/activity', controller.record);

  return router;
}
