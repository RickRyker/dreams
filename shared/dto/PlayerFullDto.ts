// shared/dto/PlayerFullDto.ts
import { z } from "zod";
import { PlayerFullSchema } from "../zod/PlayerFullSchema";

export type PlayerFullDto = z.infer<typeof PlayerFullSchema>;