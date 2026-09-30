// shared/dto/PasswordResetDto.ts

import { z } from "zod";

export const RequestPasswordResetSchema = z.object({
  email: z.email(),
});

export type RequestPasswordResetDto = z.infer<typeof RequestPasswordResetSchema>;

export const PerformPasswordResetSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

export type PerformPasswordResetDto = z.infer<typeof PerformPasswordResetSchema>;
