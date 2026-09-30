// shared/dto/RegionalIngredientDto.ts
import { z } from "zod";
import { RegionalIngredientSchema } from "../zod/RegionalIngredientSchema";

export type RegionalIngredientDto = z.infer<typeof RegionalIngredientSchema>;