// shared/dto/BanDto.ts
import { z } from "zod";
import { BanSchema } from "../zod/BanSchema";

export type BanDto = z.infer<typeof BanSchema>;