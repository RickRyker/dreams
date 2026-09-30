// shared/dto/CreatePlayerDto.ts

import { z } from "zod";

export const CreatePlayerRequestSchema = z.object({
  name: z.string().min(3),
});

export type CreatePlayerRequestDto = z.infer<typeof CreatePlayerRequestSchema>;
