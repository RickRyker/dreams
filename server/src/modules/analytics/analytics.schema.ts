// server/src/modules/analytics/analytics.schema.ts

import { z } from 'zod';

export const economySnapshotSchema = z.object({
  totalGold: z.number().int(),
  totalItems: z.number().int(),
  activeAuctions: z.number().int(),
  activeListings: z.number().int(),
  metadata: z.any().optional()
});

export const recordServerMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  tags: z.any().optional()
});

export const heatmapQuerySchema = z.object({
  mapId: z.string(),
  from: z.string().datetime(),
  to: z.string().datetime()
});
