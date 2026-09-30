// shared/dto/AbilityDefinitionDto.ts
import { z } from "zod";
import { AbilityDefinitionSchema } from "../zod/AbilityDefinitionSchema";

export type AbilityDefinitionDto = z.infer<typeof AbilityDefinitionSchema>;