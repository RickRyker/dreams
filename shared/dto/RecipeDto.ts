// shared/dto/RecipeDto.ts
import { z } from "zod";
import { RecipeSchema } from "../zod/RecipeSchema";

export type RecipeDto = z.infer<typeof RecipeSchema>;