// shared/zod/RegisterRequestSchema.ts

import {z} from "zod";

export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
