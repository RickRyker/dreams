// server/src/mappers/role.mapper.ts

import { Role } from "@prisma/client";
import { RoleDto } from "shared";

export function toRoleDto(model: Role): RoleDto {
  return {
    id: model.id,
    name: model.name,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toRoleDtoList(models: Role[]): RoleDto[] {
  return models.map(toRoleDto);
}
