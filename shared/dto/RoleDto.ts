// shared/dto/RoleDto.ts
import { z } from "zod";
import { RoleSchema } from "../zod/RoleSchema";

export type RoleDto = z.infer<typeof RoleSchema>;