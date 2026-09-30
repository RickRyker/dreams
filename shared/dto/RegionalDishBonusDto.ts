// shared/dto/RegionalDishBonusDto.ts
import { z } from "zod";
import { RegionalDishBonusSchema } from "../zod/RegionalDishBonusSchema";

export type RegionalDishBonusDto = z.infer<typeof RegionalDishBonusSchema>;