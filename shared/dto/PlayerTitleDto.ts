// shared/dto/PlayerTitleDto.ts
import { z } from "zod";
import { PlayerTitleSchema } from "../zod/PlayerTitleSchema";

export type PlayerTitleDto = z.infer<typeof PlayerTitleSchema>;