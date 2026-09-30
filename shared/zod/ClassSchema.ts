// shared/zod/ClassSchema.ts

import {z} from 'zod';

export const AssignClassRequestSchema = z.object({
  classId: z.string(),
});

export type AssignClassRequestDTO = z.infer<typeof AssignClassRequestSchema>;

export const ClassDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  statGrowth: z.any().optional(),
});

export type ClassDTO = z.infer<typeof ClassDTOSchema>;

export const PlayerClassDTOSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  classId: z.string(),
  class: ClassDTOSchema,
});

export type PlayerClassDTO = z.infer<typeof PlayerClassDTOSchema>;
