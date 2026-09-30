// server/src/modules/roles/types.ts

import { PlayerRole, RolePermission } from '@prisma/client';

export interface RoleDTO {
  id: string;
  name: string;
  permissions: RolePermission[];
}

export interface PlayerRoleRelationDTO {
  playerId: string;
  roleId: string;
}

export interface AssignRoleRequest {
  playerId: string;
  roleId: string;
}

export interface RemoveRoleRequest {
  playerId: string;
  roleId: string;
}

