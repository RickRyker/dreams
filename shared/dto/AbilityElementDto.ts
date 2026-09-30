// shared/dto/AbilityElementDto.ts
import { z } from "zod";
import { AbilityElementSchema } from "../zod/AbilityElementSchema";

export type AbilityElementDto = z.infer<typeof AbilityElementSchema>;