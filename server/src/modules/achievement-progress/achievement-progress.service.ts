// server/src/modules/achievement-progress/achievement-progress.service.ts

import { PrismaClient } from '@prisma/client';

export class AchievementProgressService {
  constructor(private prisma: PrismaClient) {}

  async recordActivity(playerId: string, activityType: string, activityData: any) {
    const activity = await this.prisma.playerActivity.upsert({
      where: { playerId_activityType: { playerId, activityType } },
      update: {
        count: { increment: 1 },
        activityData,
        timestamp: new Date()
      },
      create: {
        playerId,
        activityType,
        activityData,
        count: 1
      }
    });

    await this.checkAchievements(playerId, activityType, activity);
    return activity;
  }

  async checkAchievements(playerId: string, activityType: string, activity: any) {
    const achievements = await this.prisma.achievement.findMany({
      where: {
        category: {
          in: ['COMBAT', 'CRAFTING', 'EXPLORATION', 'SOCIAL']
        }
      }
    });

    for (const ach of achievements) {
      if (!ach.requirements) continue;

      const req = ach.requirements as any;

      if (req.kills && activityType === 'MONSTER_KILL') {
        if (activity.count >= req.kills.count &&
          activity.activityData.monsterSlug === req.kills.monsterSlug) {
          await this.awardAchievement(playerId, ach.id);
        }
      }

      if (req.crafting && activityType === 'RECIPE_CRAFTED') {
        if (activity.count >= req.crafting.count &&
          activity.activityData.recipeId === req.crafting.recipeId) {
          await this.awardAchievement(playerId, ach.id);
        }
      }

      if (req.gathering && activityType === 'RESOURCE_GATHERED') {
        if (activity.count >= req.gathering.count &&
          activity.activityData.resourceType === req.gathering.resourceType) {
          await this.awardAchievement(playerId, ach.id);
        }
      }
    }
  }

  async awardAchievement(playerId: string, achievementId: string) {
    const already = await this.prisma.playerAchievement.findUnique({
      where: { playerId_achievementId: { playerId, achievementId } }
    });

    if (already) return;

    await this.prisma.playerAchievement.create({
      data: { playerId, achievementId }
    });

    const ach = await this.prisma.achievement.findUnique({
      where: { id: achievementId },
      include: { titles: true }
    });

    if (ach?.titles?.length) {
      for (const t of ach.titles) {
        await this.prisma.player.update({
          where: { id: playerId },
          data: { title: t.slug }
        });
      }
    }
  }
}
