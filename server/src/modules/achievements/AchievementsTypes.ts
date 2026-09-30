// server/src/modules/achievements/AchievementsTypes.ts

import { Achievement, PlayerAchievement, AchievementCategory, AchievementTier } from '@prisma/client';

export interface AchievementDTO {
  id: string;
  name: string;
  description?: string | null;
  category: AchievementCategory;
  tier: AchievementTier;
  points: number;
  earned?: boolean;
}

export interface PlayerAchievementDTO {
  id: string;
  playerId: string;
  achievementId: string;
  unlockedAt: Date;
  achievement: AchievementDTO;
}

export interface AchievementPreviewDTO {
  id: string;
  name: string;
  description?: string | null;
  tier: AchievementTier;
  points: number;
  rewards: {
    titles?: string[];
  };
}

export interface LeaderboardEntryDTO {
  playerId: string;
  playerName: string;
  score: number;
  achievementCount: number;
}

export interface ListAchievementsFilters {
  playerId: string;
  category?: AchievementCategory;
  tier?: AchievementTier;
  earned?: boolean;
}

export interface UnlockAchievementRequest {
  playerId: string;
  achievementId: string;
}

