// shared/dto/PlayerPetDto.ts
import { z } from "zod";
import { PlayerPetSchema } from "../zod/PlayerPetSchema";

export type PlayerPetDto = z.infer<typeof PlayerPetSchema>;