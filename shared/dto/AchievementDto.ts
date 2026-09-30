// shared/dto/AchievementDto.ts
import { z } from "zod";
import { AchievementSchema } from "../zod/AchievementSchema";

export type AchievementDto = z.infer<typeof AchievementSchema>;