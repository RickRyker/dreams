// shared/dto/MonsterDto.ts
import { z } from "zod";
import { MonsterSchema } from "../zod/MonsterSchema";

export type MonsterDto = z.infer<typeof MonsterSchema>;