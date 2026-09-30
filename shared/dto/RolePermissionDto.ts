// shared/dto/RolePermissionDto.ts
import { z } from "zod";
import { RolePermissionSchema } from "../zod/RolePermissionSchema";

export type RolePermissionDto = z.infer<typeof RolePermissionSchema>;