// shared/dto/VerifyEmailDto.ts

import { z } from "zod";

export const VerifyEmailRequestSchema = z.object({
  token: z.string(),
});

export type VerifyEmailRequestDto = z.infer<typeof VerifyEmailRequestSchema>;
