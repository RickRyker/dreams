// shared/dto/PasswordResetTokenDto.ts
import { z } from "zod";
import { PasswordResetTokenSchema } from "../zod/PasswordResetTokenSchema";

export type PasswordResetTokenDto = z.infer<typeof PasswordResetTokenSchema>;