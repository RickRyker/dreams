// shared/dto/ItemGemDto.ts
import { z } from "zod";
import { ItemGemSchema } from "../zod/ItemGemSchema";

export type ItemGemDto = z.infer<typeof ItemGemSchema>;