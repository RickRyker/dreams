// shared/dto/EffectTypeDto.ts
import { z } from "zod";
import { EffectTypeSchema } from "../zod/EffectTypeSchema";

export type EffectTypeDto = z.infer<typeof EffectTypeSchema>;