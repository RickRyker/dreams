// server/src/modules/achievements/AchievementsClient.ts

import {
  listAchievementsResponseSchema,
  previewAchievementResponseSchema,
  leaderboardResponseSchema,
  unlockAchievementResponseSchema,
  progressResponseSchema,
  categoriesResponseSchema,
  tiersResponseSchema
} from './AchievementsResponse';

import {
  listAchievementsQuerySchema,
  leaderboardQuerySchema,
  previewAchievementParamsSchema,
  unlockAchievementBodySchema,
  unlockAchievementParamsSchema,
  progressQuerySchema
} from './AchievementsSchema';

export const createAchievementsClient = (base = "/api/achievements") => ({
  async listAchievements(input: any) {
    const parsed = listAchievementsQuerySchema.parse(input);
    const url = new URL(base, location.origin);
    Object.entries(parsed).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });

    const res = await fetch(url);
    return listAchievementsResponseSchema.parse(await res.json());
  },

  async previewAchievement(achievementId: string) {
    previewAchievementParamsSchema.parse({ achievementId });
    const res = await fetch(`${base}/${achievementId}/preview`);
    return previewAchievementResponseSchema.parse(await res.json());
  },

  async leaderboard(input = {}) {
    const parsed = leaderboardQuerySchema.parse(input);
    const url = new URL(`${base}/leaderboard`, location.origin);
    url.searchParams.set("limit", String(parsed.limit));

    const res = await fetch(url);
    return leaderboardResponseSchema.parse(await res.json());
  },

  async unlockAchievement(achievementId: string, playerId: string) {
    unlockAchievementParamsSchema.parse({ achievementId });
    const body = unlockAchievementBodySchema.parse({ playerId });

    const res = await fetch(`${base}/${achievementId}/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    return unlockAchievementResponseSchema.parse(await res.json());
  },

  async progress(playerId: string) {
    const parsed = progressQuerySchema.parse({ playerId });
    const url = new URL(`${base}/progress`, location.origin);
    url.searchParams.set("playerId", parsed.playerId);

    const res = await fetch(url);
    return progressResponseSchema.parse(await res.json());
  },

  async categories() {
    const res = await fetch(`${base}/meta/categories`);
    return categoriesResponseSchema.parse(await res.json());
  },

  async tiers() {
    const res = await fetch(`${base}/meta/tiers`);
    return tiersResponseSchema.parse(await res.json());
  }
});
