// shared/dto/CombatThreatDto.ts
import { z } from "zod";
import { CombatThreatSchema } from "../zod/CombatThreatSchema";

export type CombatThreatDto = z.infer<typeof CombatThreatSchema>;