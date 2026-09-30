// shared/dto/EngineCombatResolutionDto.ts
import { z } from "zod";
import { EngineCombatResolutionSchema } from "../zod/EngineCombatResolutionSchema";

export type EngineCombatResolutionDto = z.infer<typeof EngineCombatResolutionSchema>;