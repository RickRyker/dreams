// shared/dto/CastSpellRequestDto.ts
import { z } from "zod";
import { CastSpellRequestSchema } from "../zod/CastSpellRequestSchema";

export type CastSpellRequestDto = z.infer<typeof CastSpellRequestSchema>;