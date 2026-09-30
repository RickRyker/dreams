// shared/dto/ItemEnchantmentDto.ts
import { z } from "zod";
import { ItemEnchantmentSchema } from "../zod/ItemEnchantmentSchema";

export type ItemEnchantmentDto = z.infer<typeof ItemEnchantmentSchema>;