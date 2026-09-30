// shared/dto/RegionalDishDto.ts
import { z } from "zod";
import { RegionalDishSchema } from "../zod/RegionalDishSchema";

export type RegionalDishDto = z.infer<typeof RegionalDishSchema>;