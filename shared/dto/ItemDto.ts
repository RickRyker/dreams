// shared/dto/ItemDto.ts
import { z } from "zod";
import { ItemSchema } from "../zod/ItemSchema";

export type ItemDto = z.infer<typeof ItemSchema>;