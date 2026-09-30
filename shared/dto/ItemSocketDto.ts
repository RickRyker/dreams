// shared/dto/ItemSocketDto.ts
import { z } from "zod";
import { ItemSocketSchema } from "../zod/ItemSocketSchema";

export type ItemSocketDto = z.infer<typeof ItemSocketSchema>;