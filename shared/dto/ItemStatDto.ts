// shared/dto/ItemStatDto.ts
import { z } from "zod";
import { ItemStatSchema } from "../zod/ItemStatSchema";

export type ItemStatDto = z.infer<typeof ItemStatSchema>;