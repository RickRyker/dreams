// shared/dto/RegisterRequestDto.ts
import { z } from "zod";
import { RegisterRequestSchema } from "../zod/RegisterRequestSchema";

export type RegisterRequestDto = z.infer<typeof RegisterRequestSchema>;