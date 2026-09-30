// shared/dto/ReplayEffectDto.ts
import { z } from "zod";
import { ReplayEffectSchema } from "../zod/ReplayEffectSchema";

export type ReplayEffectDto = z.infer<typeof ReplayEffectSchema>;