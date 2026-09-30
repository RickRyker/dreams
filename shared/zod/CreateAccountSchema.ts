// shared/zod/CreateAccountSchema.ts

import { z } from "zod";

export const CreateAccountSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(128),
});
