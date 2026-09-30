// shared/dto/RecipeIngredientDto.ts
import { z } from "zod";
import { RecipeIngredientSchema } from "../zod/RecipeIngredientSchema";

export type RecipeIngredientDto = z.infer<typeof RecipeIngredientSchema>;