// shared/dto/WorldConfigDto.ts
import { z } from "zod";
import { WorldConfigSchema } from "../zod/WorldConfigSchema";

export type WorldConfigDto = z.infer<typeof WorldConfigSchema>;