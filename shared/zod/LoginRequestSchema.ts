// shared/zod/LoginRequestSchema.ts

import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  token: z.string(),
});
