// server/src/modules/admin/admin.router.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { requireAuth } from '../../middleware/auth';

export function createAdminRouter(prisma: PrismaClient): Router {
  const router = Router();
  const service = new AdminService(prisma);
  const controller = new AdminController(service);

  router.use(requireAuth);

  router.post('/players/:gmPlayerId/ban', controller.banPlayer);
  router.post('/unban', controller.unbanPlayer);
  router.post('/players/:gmPlayerId/mute', controller.mutePlayer);
  router.post('/unmute', controller.unmutePlayer);
  router.post('/teleport', controller.teleportPlayer);
  router.post('/spawn/monster', controller.spawnMonster);
  router.post('/spawn/item', controller.spawnItem);
  router.post('/setStat', controller.setStat);
  router.post('/addExp', controller.addExp);
  router.post('/setLevel', controller.setLevel);
  router.post('/toggleInvisibility', controller.toggleInvisibility);
  router.post('/kill', controller.killPlayer);
  router.post('/respawn', controller.respawnPlayer);

  return router;
}
