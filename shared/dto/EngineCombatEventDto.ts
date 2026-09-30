// shared/dto/EngineCombatEventDto.ts
import { z } from "zod";
import { EngineCombatEventSchema } from "../zod/EngineCombatEventSchema";

export type EngineCombatEventDto = z.infer<typeof EngineCombatEventSchema>;