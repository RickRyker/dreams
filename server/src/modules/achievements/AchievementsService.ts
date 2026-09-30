// server/src/modules/achievements/AchievementsService.ts

import { AchievementCategory, AchievementTier } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";

export class AchievementsService {
  constructor(private prisma: PrismaClient) {}

  // ---------------------------------------
  //  List Achievements (with filters)
  // ---------------------------------------

  async listAchievements(
    playerId: string,
    filters: {
      category?: AchievementCategory;
      tier?: AchievementTier;
      earned?: boolean;
    }
  ) {
    const achievements = await this.prisma.achievement.findMany({
      where: {
        ...(filters.category ? { category: filters.category } : {}),
        ...(filters.tier ? { tier: filters.tier } : {})
      },
      include: {
        playerAchievements: {
          where: { playerId }
        }
      }
    });

    // Add earned flag
    const withEarned = achievements.map((a: (typeof achievements)[number]) => ({
      ...a,
      earned: a.playerAchievements.length > 0
    }));

    // Optional earned filter
    if (filters.earned === undefined) return withEarned;
    return withEarned.filter((a: (typeof withEarned)[number]) => a.earned === filters.earned);
  }

  // ---------------------------------------
  //  Preview Achievement
  // ---------------------------------------

  async previewAchievement(achievementId: string) {
    const ach = await this.prisma.achievement.findUnique({
      where: { id: achievementId },
      include: {
        titles: true // reward titles
      }
    });

    if (!ach) throw new Error("Achievement not found");

    return {
      id: ach.id,
      name: ach.name,
      description: ach.description,
      tier: ach.tier,
      points: ach.points,
      rewards: {
        titles: ach.titles.map((t: (typeof ach.titles)[number]) => t.slug)
      }
    };
  }

  // ---------------------------------------
  //  Leaderboard
  // ---------------------------------------

  async leaderboard(limit: number) {
    const achievements = await this.prisma.playerAchievement.findMany({
      include: {
        achievement: true
      }
    });;
    const scores = achievements.reduce((acc: Record<string, number>, pa: (typeof achievements)[number]) => {
      acc[pa.playerId] = (acc[pa.playerId] ?? 0) + pa.achievement.points;
      return acc;
    }, {} as Record<string, number>)
    // Group by player and sum achievement points
    const grouped = Object.entries(scores).map(([playerId, points]) => ({
      playerId,
      _sum: { points }
    }));

    // Fetch player names in parallel
    return await Promise.all(
      grouped.map(async (entry) => {
        const player = await this.prisma.player.findUnique({
          where: {id: entry.playerId},
          select: {name: true}
        });

        return {
          playerId: entry.playerId,
          playerName: player?.name ?? "Unknown",
          score: entry._sum.points ?? 0
        };
      })
    );
  }
}
