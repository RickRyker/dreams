// server/src/modules/roles/roles.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { assignRoleSchema, removeRoleSchema } from "./roles.schema";
import { RolesRepository } from "./RolesRepository";
import { RolesMapper } from "./RolesMapper";
import { RolesService } from "./RolesService";
import { RolesController } from "./RolesController";
import { requirePermission } from "./roles.middleware";

export function createRolesRouter(): Router {
  const router = Router();
  const repository = new RolesRepository();
  const mapper = new RolesMapper();
  const service = new RolesService(repository, mapper);
  const controller = new RolesController(service);

  router.use(authMiddleware);
  router.get("/", requirePermission("ADMIN_MANAGE_ROLES"), controller.listRoles);
  router.get("/:roleId", requirePermission("ADMIN_MANAGE_ROLES"), controller.getRoleById);
  router.post("/assign", requirePermission("ADMIN_MANAGE_ROLES"), (req, res) => {
    const parsed = assignRoleSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    req.body = parsed.data;
    return controller.assignRole(req, res);
  });
  router.post("/remove", requirePermission("ADMIN_MANAGE_ROLES"), (req, res) => {
    const parsed = removeRoleSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    req.body = parsed.data;
    return controller.removeRole(req, res);
  });
  router.get("/:playerId/permissions", controller.checkPermission);

  return router;
}

export const rolesRouter = createRolesRouter();
