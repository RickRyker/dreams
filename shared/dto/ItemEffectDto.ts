// shared/dto/ItemEffectDto.ts
import { z } from "zod";
import { ItemEffectSchema } from "../zod/ItemEffectSchema";

export type ItemEffectDto = z.infer<typeof ItemEffectSchema>;