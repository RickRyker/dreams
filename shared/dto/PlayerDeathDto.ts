// shared/dto/PlayerDeathDto.ts
import { z } from "zod";
import { PlayerDeathSchema } from "../zod/PlayerDeathSchema";

export type PlayerDeathDto = z.infer<typeof PlayerDeathSchema>;