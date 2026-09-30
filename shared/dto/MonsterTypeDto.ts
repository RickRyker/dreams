// shared/dto/MonsterTypeDto.ts
import { z } from "zod";
import { MonsterTypeSchema } from "../zod/MonsterTypeSchema";

export type MonsterTypeDto = z.infer<typeof MonsterTypeSchema>;