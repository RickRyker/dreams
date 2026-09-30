// shared/dto/PetStatDto.ts
import { z } from "zod";
import { PetStatSchema } from "../zod/PetStatSchema";

export type PetStatDto = z.infer<typeof PetStatSchema>;