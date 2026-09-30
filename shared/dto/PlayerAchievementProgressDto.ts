// shared/dto/PlayerAchievementProgressDto.ts
import { z } from "zod";
import { PlayerAchievementProgressSchema } from "../zod/PlayerAchievementProgressSchema";

export type PlayerAchievementProgressDto = z.infer<typeof PlayerAchievementProgressSchema>;