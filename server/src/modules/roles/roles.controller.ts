// server/src/modules/roles/roles.controller.ts

import {
  listRoles,
  getRoleById,
  assignRole,
  removeRole
} from './roles.service.js';
import { AppError } from '../../errors/AppError.js';

export const listRolesController = async () => {
  return listRoles();
};

export const getRoleController = async (roleId: string) => {
  const role = await getRoleById(roleId);
  if (!role) throw new AppError('Role not found', 404);
  return role;
};

export const assignRoleController = async (playerId: string, roleId: string) => {
  return assignRole(playerId, roleId);
};

export const removeRoleController = async (playerId: string, roleId: string) => {
  return removeRole(playerId, roleId);
};

/*
import { Request, Response } from 'express';
import { RolesService } from './roles.service';
import {
  createRoleSchema,
  assignPermissionSchema,
  assignRoleToPlayerSchema
} from './roles.schema';

export class RolesController {
  constructor(private service: RolesService) {}

  createRole = async (req: Request, res: Response) => {
    const { name } = createRoleSchema.parse(req.body);
    const role = await this.service.createRole(name);
    res.status(201).json(role);
  };

  assignPermission = async (req: Request, res: Response) => {
    const { roleId, permission } = assignPermissionSchema.parse(req.body);
    const rp = await this.service.assignPermission(roleId, permission);
    res.status(201).json(rp);
  };

  assignRoleToPlayer = async (req: Request, res: Response) => {
    const { playerId, roleId } = assignRoleToPlayerSchema.parse(req.body);
    const pr = await this.service.assignRoleToPlayer(playerId, roleId);
    res.status(201).json(pr);
  };

  listRoles = async (_req: Request, res: Response) => {
    const roles = await this.service.listRoles();
    res.json(roles);
  };

  listPlayerRoles = async (req: Request, res: Response) => {
    const { playerId } = req.params;
    const roles = await this.service.listPlayerRoles(playerId);
    res.json(roles);
  };
}
*/