// shared/zod/GuildSchema.ts


import {z} from "zod";

export const GuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  reputation: z.number().int(),
  founderId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
