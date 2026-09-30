// shared/zod/PlayerPetSchema.ts

import { z } from "zod";

export const PlayerPetSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
  species: z.string(),
  level: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
