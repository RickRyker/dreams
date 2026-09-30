// shared/dto/AbilityTagDto.ts
import { z } from "zod";
import { AbilityTagSchema } from "../zod/AbilityTagSchema";

export type AbilityTagDto = z.infer<typeof AbilityTagSchema>;