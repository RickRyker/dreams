// server/src/modules/roles/roles.service.ts

import { RolesService as RolesServiceClass } from "./RolesService";
import { RolesRepository } from "./RolesRepository";
import { RolesMapper } from "./RolesMapper";

const service = new RolesServiceClass(new RolesRepository(), new RolesMapper());

export const listRoles = async () => service.listRoles();
export const getRoleById = async (roleId: string) => service.getRoleById(roleId);
export const assignRole = async (playerId: string, roleId: string) => service.assignRoleToPlayer(playerId, roleId);
export const removeRole = async (playerId: string, roleId: string) => service.removeRoleFromPlayer(playerId, roleId);
export const playerHasPermission = async (playerId: string, permission: string) =>
  service.playerHasPermission(playerId, permission);

export { RolesService } from "./RolesService";
