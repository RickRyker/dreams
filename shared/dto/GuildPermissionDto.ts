// shared/dto/GuildPermissionDto.ts
import { z } from "zod";
import { GuildPermissionSchema } from "../zod/GuildPermissionSchema";

export type GuildPermissionDto = z.infer<typeof GuildPermissionSchema>;