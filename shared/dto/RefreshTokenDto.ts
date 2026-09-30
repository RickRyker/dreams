// shared/dto/RefreshTokenDto.ts
import { z } from "zod";
import { RefreshTokenSchema } from "../zod/RefreshTokenSchema";

export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>;