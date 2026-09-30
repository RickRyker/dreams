// server/src/modules/achievements/AchievementsResponse.ts

import { z } from "zod";
import { AchievementCategory, AchievementTier } from "@prisma/client";

// ---------------------------------------
//  Achievement list item
// ---------------------------------------

export const achievementListItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  tier: z.nativeEnum(AchievementTier),
  points: z.number(),
  category: z.nativeEnum(AchievementCategory),
  earned: z.boolean()
});

export const listAchievementsResponseSchema = z.array(
  achievementListItemSchema
);

// ---------------------------------------
//  Preview
// ---------------------------------------

export const previewAchievementResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  tier: z.nativeEnum(AchievementTier),
  points: z.number(),
  rewards: z.object({
    titles: z.array(z.string())
  })
});

// ---------------------------------------
//  Leaderboard
// ---------------------------------------

export const leaderboardEntrySchema = z.object({
  playerId: z.string(),
  playerName: z.string(),
  score: z.number()
});

export const leaderboardResponseSchema = z.array(leaderboardEntrySchema);

// ---------------------------------------
//  Unlock
// ---------------------------------------

export const unlockAchievementResponseSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  achievementId: z.string(),
  earnedAt: z.date()
});

// ---------------------------------------
//  Progress
// ---------------------------------------

export const progressEntrySchema = z.object({
  achievementId: z.string(),
  earnedAt: z.date(),
  points: z.number(),
  tier: z.nativeEnum(AchievementTier),
  category: z.nativeEnum(AchievementCategory)
});

export const progressResponseSchema = z.array(progressEntrySchema);

// ---------------------------------------
//  Metadata
// ---------------------------------------

export const categoriesResponseSchema = z.object({
  categories: z.array(z.nativeEnum(AchievementCategory))
});

export const tiersResponseSchema = z.object({
  tiers: z.array(z.nativeEnum(AchievementTier))
});
