// server/src/modules/achievements/AchievementsController.ts

import {prisma} from "@prisma";
import { AchievementCategory, AchievementTier } from "@prisma/client";
import { AchievementsService } from './AchievementsService';
import {
  listAchievementsResponseSchema,
  previewAchievementResponseSchema,
  leaderboardResponseSchema,
  unlockAchievementResponseSchema,
  progressResponseSchema,
  categoriesResponseSchema,
  tiersResponseSchema
} from "./AchievementsResponse";

import {
  ListAchievementsQuery,
  LeaderboardQuery,
  PreviewAchievementParams,
  UnlockAchievementParams,
  UnlockAchievementBody,
  ProgressQuery
} from "./AchievementsSchema";

const service = new AchievementsService(prisma);

// ---------------------------------------
//  List
// ---------------------------------------

export const listAchievementsController = async (query: ListAchievementsQuery) =>
  listAchievementsResponseSchema.parse(
    await service.listAchievements(query.playerId, {
      category: query.category,
      tier: query.tier,
      earned: query.earned
    })
  );

// ---------------------------------------
//  Preview
// ---------------------------------------

export const previewAchievementController = async (
  params: PreviewAchievementParams
) =>
  previewAchievementResponseSchema.parse(
    await service.previewAchievement(params.achievementId)
  );

// ---------------------------------------
//  Leaderboard
// ---------------------------------------

export const leaderboardController = async (query: LeaderboardQuery) =>
  leaderboardResponseSchema.parse(await service.leaderboard(query.limit));

// ---------------------------------------
//  Unlock
// ---------------------------------------

export const unlockAchievementController = async (
  params: UnlockAchievementParams,
  body: UnlockAchievementBody
) =>
  unlockAchievementResponseSchema.parse(
    await prisma.playerAchievement.upsert({
      where: {
        playerId_achievementId: {
          playerId: body.playerId,
          achievementId: params.achievementId
        }
      },
      update: {},
      create: {
        playerId: body.playerId,
        achievementId: params.achievementId
      }
    })
  );

// ---------------------------------------
//  Progress
// ---------------------------------------

export const progressController = async (query: ProgressQuery) =>
  progressResponseSchema.parse(
    await prisma.playerAchievement.findMany({
      where: { playerId: query.playerId },
      include: { achievement: true }
    }).then((rows) =>
      rows.map((pa) => ({
        achievementId: pa.achievementId,
        earnedAt: pa.earnedAt,
        points: pa.achievement.points,
        tier: pa.achievement.tier,
        category: pa.achievement.category
      }))
    )
  );

// ---------------------------------------
//  Metadata
// ---------------------------------------

export const categoriesController = async () =>
  categoriesResponseSchema.parse({
    categories: Object.values(AchievementCategory)
  });

export const tiersController = async () =>
  tiersResponseSchema.parse({
    tiers: Object.values(AchievementTier)
  });
