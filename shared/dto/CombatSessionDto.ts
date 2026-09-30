// shared/dto/CombatSessionDto.ts
import { z } from "zod";
import { CombatSessionSchema } from "../zod/CombatSessionSchema";

export type CombatSessionDto = z.infer<typeof CombatSessionSchema>;