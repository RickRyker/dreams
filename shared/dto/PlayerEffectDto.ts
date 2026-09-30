// shared/dto/PlayerEffectDto.ts
import { z } from "zod";
import { PlayerEffectSchema } from "../zod/PlayerEffectSchema";

export type PlayerEffectDto = z.infer<typeof PlayerEffectSchema>;