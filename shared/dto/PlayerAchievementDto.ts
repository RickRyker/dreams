// shared/dto/PlayerAchievementDto.ts
import { z } from "zod";
import { PlayerAchievementSchema } from "../zod/PlayerAchievementSchema";

export type PlayerAchievementDto = z.infer<typeof PlayerAchievementSchema>;