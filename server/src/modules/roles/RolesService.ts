// server/src/modules/roles/RolesService.ts

import { AppError } from "../../errors/AppError";
import { RolesMapper } from "./RolesMapper";
import { RolesRepository } from "./RolesRepository";
import type { RoleDTO } from "./types";

export class RolesService {
  constructor(
    private repo: RolesRepository,
    private mapper: RolesMapper,
  ) {}

  async listRoles(): Promise<RoleDTO[]> {
    return (await this.repo.listRoles()).map((role) => this.mapper.toRoleDto(role as any));
  }

  async getRoleById(roleId: string): Promise<RoleDTO> {
    if (!roleId) throw new AppError("Role ID is required", 400);
    const role = await this.repo.getRoleById(roleId);
    if (!role) throw new AppError("Role not found", 404);
    return this.mapper.toRoleDto(role as any);
  }

  async assignRoleToPlayer(playerId: string, roleId: string) {
    if (!playerId) throw new AppError("Player ID is required", 400);
    if (!roleId) throw new AppError("Role ID is required", 400);

    const role = await this.repo.getRoleById(roleId);
    if (!role) throw new AppError("Role not found", 404);

    try {
      return this.mapper.toPlayerRoleRelationDto(await this.repo.assignRoleToPlayer(playerId, roleId));
    } catch (error: any) {
      if (error.code === "P2025") throw new AppError("Player not found", 404);
      throw new AppError("Failed to assign role", 500);
    }
  }

  async removeRoleFromPlayer(playerId: string, roleId: string) {
    if (!playerId) throw new AppError("Player ID is required", 400);
    if (!roleId) throw new AppError("Role ID is required", 400);

    try {
      return await this.repo.removeRoleFromPlayer(playerId, roleId);
    } catch (error: any) {
      if (error.code === "P2025") throw new AppError("Player not found", 404);
      throw new AppError("Failed to remove role", 500);
    }
  }

  async playerHasPermission(playerId: string, permission: string): Promise<boolean> {
    if (!playerId) throw new AppError("Player ID is required", 400);
    if (!permission) throw new AppError("Permission is required", 400);

    try {
      return await this.repo.playerHasPermission(playerId, permission);
    } catch {
      throw new AppError("Failed to check permission", 500);
    }
  }
}
