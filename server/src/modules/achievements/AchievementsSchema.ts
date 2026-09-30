// server/src/modules/achievements/AchievementsSchema.ts

import { z } from "zod";
import { AchievementCategory, AchievementTier } from "@prisma/client";

// ---------------------------------------
//  Shared enums
// ---------------------------------------

export const achievementCategorySchema = z.nativeEnum(AchievementCategory);
export const achievementTierSchema = z.nativeEnum(AchievementTier);

// ---------------------------------------
//  List / filter clients
// ---------------------------------------

export const listAchievementsQuerySchema = z.object({
  playerId: z.string(),
  category: achievementCategorySchema.optional(),
  tier: achievementTierSchema.optional(),
  earned: z
    .union([z.literal("true"), z.literal("false")])
    .transform((v) => v === "true")
    .optional()
});

export type ListAchievementsQuery = z.infer<typeof listAchievementsQuerySchema>;

// ---------------------------------------
//  Leaderboard
// ---------------------------------------

export const leaderboardQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 50))
    .pipe(z.number().int().min(1).max(100))
});

export type LeaderboardQuery = z.infer<typeof leaderboardQuerySchema>;

// ---------------------------------------
//  Preview
// ---------------------------------------

export const previewAchievementParamsSchema = z.object({
  achievementId: z.string()
});

export type PreviewAchievementParams = z.infer<
  typeof previewAchievementParamsSchema
>;

// ---------------------------------------
//  Unlock
// ---------------------------------------

export const unlockAchievementBodySchema = z.object({
  playerId: z.string()
});

export const unlockAchievementParamsSchema = z.object({
  achievementId: z.string()
});

export type UnlockAchievementBody = z.infer<
  typeof unlockAchievementBodySchema
>;
export type UnlockAchievementParams = z.infer<
  typeof unlockAchievementParamsSchema
>;

// ---------------------------------------
//  Progress
// ---------------------------------------

export const progressQuerySchema = z.object({
  playerId: z.string()
});

export type ProgressQuery = z.infer<typeof progressQuerySchema>;

// ---------------------------------------
//  Metadata
// ---------------------------------------

export const achievementCategoriesResponseSchema = z.object({
  categories: z.array(achievementCategorySchema)
});

export const achievementTiersResponseSchema = z.object({
  tiers: z.array(achievementTierSchema)
});
