// server/src/modules/events/events.router.ts

import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { EventsRepository } from './EventsRepository';
import { EventsMapper } from './EventsMapper';
import { EventsService } from './EventsService';
import { EventsController } from './EventsController';

export function createEventsRouter(): Router {
  const router = Router();
  const repository = new EventsRepository();
  const mapper = new EventsMapper();
  const service = new EventsService(repository, mapper);
  const controller = new EventsController(service);

  router.get('/events/active', (req, res) => controller.listActiveEvents(req, res));
  router.get('/events', (req, res) => controller.listEvents(req, res));

  router.use(requireAuth);
  router.post('/events/players/:playerId/join', (req, res) => controller.joinEvent(req, res));
  router.get('/events/:eventId/participation/:playerId', (req, res) => controller.getParticipation(req, res));

  router.use(requireAuth);
  router.post('/events', (req, res) => controller.createEvent(req, res));
  router.put('/events', (req, res) => controller.updateEvent(req, res));

  return router;
}
