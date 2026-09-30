// server/src/buffs/BuffService.ts

import {prisma} from "@prisma";
import {RewardType} from '@prisma/client';

export class BuffService {

  async getXpMultiplier(playerId: string): Promise<number> {
    const now = new Date();

    const rewards = await prisma.eventReward.findMany({
      where: {
        rewardType: RewardType.XP_BOOST,
        event: {
          isActive: true,
          startsAt: { lte: now },
          endsAt: { gte: now },
        },
      },
      include: {
        event: {
          include: {
            participations: {
              where: { playerId },
            },
          },
        },
      },
    });

    let mult = 1.0;

    for (const r of rewards) {
      const p = r.event.participations[0];
      if (!p || !p.rewardClaimed) continue;
      mult *= 1 + (r.value ?? 0);
    }

    return mult;
  }

  async getDropRateMultiplier(playerId: string): Promise<number> {
    const now = new Date();

    const rewards = await prisma.eventReward.findMany({
      where: {
        rewardType: RewardType.DROP_RATE,
        event: {
          isActive: true,
          startsAt: { lte: now },
          endsAt: { gte: now },
        },
      },
      include: {
        event: {
          include: {
            participations: {
              where: { playerId },
            },
          },
        },
      },
    });

    let mult = 1.0;

    for (const r of rewards) {
      const p = r.event.participations[0];
      if (!p || !p.rewardClaimed) continue;
      mult *= 1 + (r.value ?? 0);
    }

    return mult;
  }

  async applyXpGain(playerId: string, baseXp: number): Promise<number> {
    const mult = await this.getXpMultiplier(playerId);
    return Math.floor(baseXp * mult);
  }

  async applyDropChance(playerId: string, baseChance: number): Promise<number> {
    const mult = await this.getDropRateMultiplier(playerId);
    return Math.min(1, baseChance * mult);
  }

}
