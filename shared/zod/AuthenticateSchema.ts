// shared/zod/AuthenticateSchema.ts

import { z } from "zod";

export const AuthenticateSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});
