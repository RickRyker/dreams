// shared/dto/AuthenticateDto.ts
import { z } from "zod";
import { AuthenticateSchema } from "../zod/AuthenticateSchema";

export type AuthenticateDto = z.infer<typeof AuthenticateSchema>;