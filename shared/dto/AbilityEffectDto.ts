// shared/dto/AbilityEffectDto.ts
import { z } from "zod";
import { AbilityEffectSchema } from "../zod/AbilityEffectSchema";

export type AbilityEffectDto = z.infer<typeof AbilityEffectSchema>;