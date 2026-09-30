// shared/dto/CombatLogEntryDto.ts
import { z } from "zod";
import { CombatLogEntrySchema } from "../zod/CombatLogEntrySchema";

export type CombatLogEntryDto = z.infer<typeof CombatLogEntrySchema>;