// server/src/mappers/role.permission.mapper.ts

import {RolePermission} from "@prisma/client";
import {RolePermissionDto} from "shared";

export function toRolePermissionDto(model: RolePermission): RolePermissionDto {
  return {
    id: model.id,
    roleId: model.roleId,
    permission: model.permission,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toRolePermissionDtoList(models: RolePermission[]): RolePermissionDto[] {
  return models.map(toRolePermissionDto);
}
