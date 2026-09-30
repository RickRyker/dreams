// shared/dto/LoginRequestDto.ts
import { z } from "zod";
import { LoginRequestSchema } from "../zod/LoginRequestSchema";

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;