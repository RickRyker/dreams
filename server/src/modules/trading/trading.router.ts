// server/src/modules/trading/trading.router.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { requireAuth } from '../../middleware/auth';

export function createTradingRouter(prisma: PrismaClient): Router {
  const router = Router();
  const service = new TradingService(prisma);
  const controller = new TradingController(service);

  router.use(requireAuth);

  // direct trades
  router.post('/players/:playerId/trades', controller.createTrade);
  router.post('/players/:playerId/trades/items', controller.addTradeItem);
  router.post('/players/:playerId/trades/status', controller.updateTradeStatus);
  router.get('/players/:playerId/trades', controller.listTrades);

  // auctions
  router.post('/players/:playerId/auctions', controller.createAuction);
  router.get('/auctions', controller.listAuctions);
  router.post('/players/:playerId/auctions/bid', controller.bidAuction);

  // market
  router.post('/players/:playerId/market/listings', controller.createMarketListing);
  router.get('/market/listings', controller.listMarketListings);

  // NPC stores
  router.post('/players/:playerId/npc-store/buy', controller.npcBuy);
  router.post('/players/:playerId/npc-store/sell', controller.npcSell);

  return router;
}
