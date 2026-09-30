// shared/dto/PetTypeDto.ts
import { z } from "zod";
import { PetTypeSchema } from "../zod/PetTypeSchema";

export type PetTypeDto = z.infer<typeof PetTypeSchema>;