// shared/dto/MuteDto.ts
import { z } from "zod";
import { MuteSchema } from "../zod/MuteSchema";

export type MuteDto = z.infer<typeof MuteSchema>;