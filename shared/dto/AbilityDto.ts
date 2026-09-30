// shared/dto/AbilityDto.ts
import { z } from "zod";
import { AbilitySchema } from "../zod/AbilitySchema";

export type AbilityDto = z.infer<typeof AbilitySchema>;