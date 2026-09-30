// server/src/modules/analytics/analytics.controller.ts

import { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';
import { recordServerMetricSchema, heatmapQuerySchema } from './analytics.schema';

export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  takeEconomySnapshot = async (_req: Request, res: Response) => {
    const snapshot = await this.service.takeEconomySnapshot();
    res.status(201).json(snapshot);
  };

  listEconomySnapshots = async (_req: Request, res: Response) => {
    const snapshots = await this.service.listEconomySnapshots();
    res.json(snapshots);
  };

  recordServerMetric = async (req: Request, res: Response) => {
    const parsed = recordServerMetricSchema.parse(req.body);
    const metric = await this.service.recordServerMetric(parsed.name, parsed.value, parsed.tags);
    res.status(201).json(metric);
  };

  listServerMetrics = async (req: Request, res: Response) => {
    const { name } = req.query;
    const metrics = await this.service.listServerMetrics(name ? String(name) : undefined);
    res.json(metrics);
  };

  listPlayerSessions = async (req: Request, res: Response) => {
    const playerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    const sessions = await this.service.listPlayerSessions(playerId);
    res.json(sessions);
  };

  heatmap = async (req: Request, res: Response) => {
    const parsed = heatmapQuerySchema.parse(req.query);
    const events = await this.service.getHeatmap(
      parsed.mapId,
      new Date(parsed.from),
      new Date(parsed.to)
    );
    res.json(events);
  };
}
