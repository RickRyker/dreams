// server/src/events/EventRouter.ts

import { Router } from 'express';
import { EventRepository } from './EventRepository';
import { EventService } from './EventService';
import { EventController } from './EventController';
import { requireAuth } from '../middleware/AuthMiddleware';

const repo = new EventRepository();
const service = new EventService(repo);
const controller = new EventController(service);

export const eventRouter = Router();
eventRouter.use(requireAuth);

eventRouter.get('/events', controller.list);
eventRouter.get('/events/:slug', controller.get);
eventRouter.post('/events', controller.create);
eventRouter.patch('/events/:slug', controller.update);
eventRouter.post('/events/:slug/rewards', controller.addReward);
eventRouter.delete('/events/rewards/:rewardId', controller.deleteReward);
