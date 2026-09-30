// shared/dto/SpellDto.ts
import { z } from "zod";
import { SpellSchema } from "../zod/SpellSchema";

export type SpellDto = z.infer<typeof SpellSchema>;