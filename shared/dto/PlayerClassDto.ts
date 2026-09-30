// shared/dto/PlayerClassDto.ts
import { z } from "zod";
import { PlayerClassSchema } from "../zod/PlayerClassSchema";

export type PlayerClassDto = z.infer<typeof PlayerClassSchema>;