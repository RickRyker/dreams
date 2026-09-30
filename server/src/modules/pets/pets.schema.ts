// server/src/modules/pets/pets.schema.ts

import { z } from 'zod';

export const renamePetSchema = z.object({
  name: z.string().min(1)
});

export const selectPetSchema = z.object({
  petId: z.string()
});

export const feedPetSchema = z.object({
  petId: z.string(),
  amount: z.number().int().positive()
});

export const hatchPetSchema = z.object({
  petId: z.string()
});
