// shared/dto/CombatCastDto.ts
import { z } from "zod";
import { CombatCastSchema } from "../zod/CombatCastSchema";

export type CombatCastDto = z.infer<typeof CombatCastSchema>;