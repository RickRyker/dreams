// shared/dto/PlayerStatsDto.ts
import { z } from "zod";
import { PlayerStatsSchema } from "../zod/PlayerStatsSchema";

export type PlayerStatsDto = z.infer<typeof PlayerStatsSchema>;