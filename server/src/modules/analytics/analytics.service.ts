// server/src/modules/analytics/analytics.service.ts

import { PrismaClient } from '@prisma/client';

export class AnalyticsService {
  constructor(private prisma: PrismaClient) {}

  async takeEconomySnapshot() {
    const [goldAgg, itemCount, activeAuctions, activeListings] = await Promise.all([
      this.prisma.playerStats.aggregate({ _sum: { gold: true } }),
      this.prisma.inventoryItem.count(),
      this.prisma.auction.count({ where: { isActive: true } }),
      this.prisma.marketListing.count({ where: { isActive: true } })
    ]);

    return this.prisma.economySnapshot.create({
      data: {
        totalGold: goldAgg._sum.gold ?? 0,
        totalItems: itemCount,
        activeAuctions,
        activeListings
      }
    });
  }

  listEconomySnapshots() {
    return this.prisma.economySnapshot.findMany({
      orderBy: { takenAt: 'desc' },
      take: 100
    });
  }

  recordServerMetric(name: string, value: number, tags?: unknown) {
    return this.prisma.serverMetric.create({
      data: {
        name,
        value,
        tags: tags as any
      }
    });
  }

  listServerMetrics(name?: string) {
    return this.prisma.serverMetric.findMany({
      where: name ? { name } : undefined,
      orderBy: { recordedAt: 'desc' },
      take: 500
    });
  }

  listPlayerSessions(playerId: string) {
    return this.prisma.playerSessionLog.findMany({
      where: { playerId },
      orderBy: { loginAt: 'desc' },
      take: 100
    });
  }

  async getHeatmap(mapId: string, from: Date, to: Date) {
    const events = await this.prisma.heatmapEvent.findMany({
      where: {
        mapId,
        createdAt: { gte: from, lte: to }
      }
    });
    return events;
  }
}
