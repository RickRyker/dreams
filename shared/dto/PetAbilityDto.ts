// shared/dto/PetAbilityDto.ts
import { z } from "zod";
import { PetAbilitySchema } from "../zod/PetAbilitySchema";

export type PetAbilityDto = z.infer<typeof PetAbilitySchema>;