// shared/dto/AvatarDto.ts
import { z } from "zod";
import { AvatarSchema } from "../zod/AvatarSchema";

export type AvatarDto = z.infer<typeof AvatarSchema>;