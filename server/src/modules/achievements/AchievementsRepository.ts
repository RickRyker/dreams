// server/src/modules/achievements/AchievementsRepository.ts

import { Prisma, AchievementCategory, AchievementTier } from '@prisma/client';
import { prisma } from "@prisma";
import { AchievementDTO, PlayerAchievementDTO, LeaderboardEntryDTO } from './AchievementsTypes';

type AchievementWithTitlesDTO = AchievementDTO & {
  titles: { slug: string }[];
};

export class AchievementsRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listAchievements(
    filters?: {
      category?: AchievementCategory;
      tier?: AchievementTier;
    },
    tx?: Prisma.TransactionClient
  ): Promise<AchievementDTO[]> {
    const client = tx || prisma;
    const achievements = await client.achievement.findMany({
      where: {
        ...(filters?.category ? { category: filters.category } : {}),
        ...(filters?.tier ? { tier: filters.tier } : {})
      },
      include: {
        playerAchievements: false
      }
    });

    return achievements.map((achievement) => ({
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      category: achievement.category,
      tier: achievement.tier,
      points: achievement.points
    }));
  }

  async getAchievementById(
    achievementId: string,
    tx?: Prisma.TransactionClient
  ): Promise<AchievementWithTitlesDTO | null> {
    const client = tx || prisma;
    const achievement = await client.achievement.findUnique({
      where: { id: achievementId },
      include: { titles: true }
    });

    if (!achievement) return null;

    return {
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      category: achievement.category,
      tier: achievement.tier,
      points: achievement.points,
      titles: achievement.titles.map((title) => ({ slug: title.slug }))
    };
  }

  async getPlayerAchievements(
    playerId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerAchievementDTO[]> {
    const client = tx || prisma;
    const playerAchievements = await client.playerAchievement.findMany({
      where: { playerId },
      include: {
        achievement: true
      }
    });

    return playerAchievements.map((playerAchievement) => ({
      id: playerAchievement.id,
      playerId: playerAchievement.playerId,
      achievementId: playerAchievement.achievementId,
      unlockedAt: playerAchievement.earnedAt,
      achievement: {
        id: playerAchievement.achievement.id,
        name: playerAchievement.achievement.name,
        description: playerAchievement.achievement.description,
        category: playerAchievement.achievement.category,
        tier: playerAchievement.achievement.tier,
        points: playerAchievement.achievement.points
      }
    }));
  }

  async checkPlayerHasAchievement(
    playerId: string,
    achievementId: string,
    tx?: Prisma.TransactionClient
  ): Promise<boolean> {
    const client = tx || prisma;
    const existing = await client.playerAchievement.findFirst({
      where: { playerId, achievementId }
    });
    return !!existing;
  }

  async unlockAchievement(
    playerId: string,
    achievementId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerAchievementDTO> {
    const client = tx || prisma;
    const playerAchievement = await client.playerAchievement.create({
      data: {
        playerId,
        achievementId,
        earnedAt: new Date()
      },
      include: {
        achievement: true
      }
    });

    return {
      id: playerAchievement.id,
      playerId: playerAchievement.playerId,
      achievementId: playerAchievement.achievementId,
      unlockedAt: playerAchievement.earnedAt,
      achievement: {
        id: playerAchievement.achievement.id,
        name: playerAchievement.achievement.name,
        description: playerAchievement.achievement.description,
        category: playerAchievement.achievement.category,
        tier: playerAchievement.achievement.tier,
        points: playerAchievement.achievement.points
      }
    };
  }

  async getAchievementLeaderboard(limit: number = 100, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;

    const playerAchievements = await client.playerAchievement.findMany({
      include: {
        achievement: true
      }
    });

    // Group by player and sum points
    const playerScores = new Map<string, { points: number; count: number }>();

    for (const pa of playerAchievements) {
      const current = playerScores.get(pa.playerId) || { points: 0, count: 0 };
      playerScores.set(pa.playerId, {
        points: current.points + (pa.achievement.points || 0),
        count: current.count + 1
      });
    }

    // Fetch player names
    const leaderboard: LeaderboardEntryDTO[] = [];

    for (const [playerId, scores] of playerScores.entries()) {
      const player = await client.player.findUnique({
        where: { id: playerId },
        select: { name: true }
      });

      leaderboard.push({
        playerId,
        playerName: player?.name || 'Unknown',
        score: scores.points,
        achievementCount: scores.count
      });
    }

    // Sort by points descending and limit
    return leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async getCategories(tx?: Prisma.TransactionClient) {
    // Return enum values for AchievementCategory
    return ['COMBAT', 'EXPLORATION', 'SOCIAL', 'CRAFTING', 'QUEST'];
  }

  async getTiers(tx?: Prisma.TransactionClient) {
    // Return enum values for AchievementTier
    return ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'LEGENDARY'];
  }
}
