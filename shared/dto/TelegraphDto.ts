// shared/dto/TelegraphDto.ts
import { z } from "zod";
import { TelegraphSchema } from "../zod/TelegraphSchema";

export type TelegraphDto = z.infer<typeof TelegraphSchema>;