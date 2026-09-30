// server/src/modules/analytics/analytics.router.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { requireAuth } from '../../middleware/auth';

export function createAnalyticsRouter(prisma: PrismaClient): Router {
  const router = Router();
  const service = new AnalyticsService(prisma);
  const controller = new AnalyticsController(service);

  router.use(requireAuth);

  router.post('/analytics/economy/snapshot', controller.takeEconomySnapshot);
  router.get('/analytics/economy/snapshots', controller.listEconomySnapshots);

  router.post('/analytics/metrics', controller.recordServerMetric);
  router.get('/analytics/metrics', controller.listServerMetrics);

  router.get('/analytics/sessions/:playerId', controller.listPlayerSessions);

  router.get('/analytics/heatmap', controller.heatmap);

  return router;
}
