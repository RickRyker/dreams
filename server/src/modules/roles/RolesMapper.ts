// server/src/modules/roles/RolesMapper.ts

import type { Role, PlayerRole } from "@prisma/client";
import type { RoleDTO, PlayerRoleRelationDTO } from "./types";

export class RolesMapper {
  toRoleDto(model: Role & { permissions: unknown[] }): RoleDTO {
    return {
      id: model.id,
      name: model.name,
      permissions: model.permissions as any,
    };
  }

  toPlayerRoleRelationDto(model: PlayerRole): PlayerRoleRelationDTO {
    return {
      playerId: model.playerId,
      roleId: model.roleId,
    };
  }
}
