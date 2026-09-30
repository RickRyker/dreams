// server/src/modules/classes/ClassesRouter.ts

import {Router} from 'express';
import {authMiddleware} from '../../auth/middleware';
import {ClassesController} from './ClassesController';
import {ClassesMapper} from './ClassesMapper';
import {ClassesRepository} from './ClassesRepository';
import {ClassesService} from './ClassesService';
import {ClassesAssembler} from "./ClassesAssembler";

/**
 * Factory function to create and configure the classes router
 */
export function createClassesRouter(): Router {
  const router: Router = Router();
  const mapper = new ClassesMapper();
  const repository = new ClassesRepository(mapper);
  const assembler = new ClassesAssembler();
  const service = new ClassesService(repository, assembler);
  const controller = new ClassesController(service);

  router.get('/', authMiddleware, controller.listClasses);
  router.get('/:classId', authMiddleware, controller.getClassById);

  router.get('/player/:playerId', authMiddleware, controller.getPlayerClass);
  router.post('/player/:playerId/assign/:classId', authMiddleware,controller.assignPlayerClass);
  router.delete('/player/:playerId/remove/:classId', authMiddleware, controller.removePlayerClass);

  return router;
}
