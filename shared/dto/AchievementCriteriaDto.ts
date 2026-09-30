// shared/dto/AchievementCriteriaDto.ts
import { z } from "zod";
import { AchievementCriteriaSchema } from "../zod/AchievementCriteriaSchema";

export type AchievementCriteriaDto = z.infer<typeof AchievementCriteriaSchema>;