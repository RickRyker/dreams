// server/src/events/EventRewardRouter.ts

import { Router } from 'express';
import { EventRewardService } from '../events/EventRewardService';
import { EventRewardController } from '../events/EventRewardController';
import { WebSocketHub } from './WebSocketHub';
import { requireAuth } from '../middleware/AuthMiddleware';

const hub = new WebSocketHub();
const service = new EventRewardService(hub);
const controller = new EventRewardController(service);

export const eventRewardRouter = Router();
eventRewardRouter.use(requireAuth);

eventRewardRouter.get('/events/:slug/players/:playerId/rewards/preview', controller.preview);
eventRewardRouter.post('/events/:slug/players/:playerId/rewards/claim', controller.claim);
