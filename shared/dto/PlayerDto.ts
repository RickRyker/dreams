// shared/dto/PlayerDto.ts
import { z } from "zod";
import { PlayerSchema } from "../zod/PlayerSchema";

export type PlayerDto = z.infer<typeof PlayerSchema>;