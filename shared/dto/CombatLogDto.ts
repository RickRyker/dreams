// shared/dto/CombatLogDto.ts
import { z } from "zod";
import { CombatLogSchema } from "../zod/CombatLogSchema";

export type CombatLogDto = z.infer<typeof CombatLogSchema>;