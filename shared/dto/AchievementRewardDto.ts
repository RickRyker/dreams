// shared/dto/AchievementRewardDto.ts
import { z } from "zod";
import { AchievementRewardSchema } from "../zod/AchievementRewardSchema";

export type AchievementRewardDto = z.infer<typeof AchievementRewardSchema>;