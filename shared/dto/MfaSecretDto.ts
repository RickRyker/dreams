// shared/dto/MfaSecretDto.ts
import { z } from "zod";
import { MfaSecretSchema } from "../zod/MfaSecretSchema";

export type MfaSecretDto = z.infer<typeof MfaSecretSchema>;