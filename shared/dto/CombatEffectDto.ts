// shared/dto/CombatEffectDto.ts
import { z } from "zod";
import { CombatEffectSchema } from "../zod/CombatEffectSchema";

export type CombatEffectDto = z.infer<typeof CombatEffectSchema>;