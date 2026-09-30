// shared/dto/ProfanityPatternDto.ts
import { z } from "zod";
import { ProfanityPatternSchema } from "../zod/ProfanityPatternSchema";

export type ProfanityPatternDto = z.infer<typeof ProfanityPatternSchema>;