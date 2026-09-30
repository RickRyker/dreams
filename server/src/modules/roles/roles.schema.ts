// server/src/modules/roles/roles.schema.ts

import { z } from 'zod';

export const assignRoleSchema = z.object({
  playerId: z.string(),
  roleId: z.string()
});

export const removeRoleSchema = z.object({
  playerId: z.string(),
  roleId: z.string()
});

export const createRoleSchema = z.object({
  name: z.string()
});

export const assignPermissionSchema = z.object({
  roleId: z.string(),
  permission: z.string()
});

export const assignRoleToPlayerSchema = z.object({
  playerId: z.string(),
  roleId: z.string()
});
