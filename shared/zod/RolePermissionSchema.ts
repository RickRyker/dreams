// shared/zod/RolePermissionSchema.ts

import { z } from "zod";

export const RolePermissionSchema = z.object({
  id: z.string(),
  roleId: z.string(),
  permission: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
