// server/src/modules/trading/trading.controller.ts

import { Request, Response } from 'express';
import { TradingService } from './trading.service';
import {
  createTradeSchema,
  addTradeItemSchema,
  updateTradeStatusSchema,
  createAuctionSchema,
  bidAuctionSchema,
  createMarketListingSchema,
  npcStoreBuySchema,
  npcStoreSellSchema
} from './trading.schema';

export class TradingController {
  constructor(private service: TradingService) {}

  private getPlayerId(req: Request): string | null {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (paramPlayerId) return paramPlayerId;

    const body = req.body as { playerId?: unknown } | undefined;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  createTrade = async (req: Request, res: Response) => {
    const fromPlayerId = this.getPlayerId(req);
    if (!fromPlayerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { toPlayerId } = createTradeSchema.parse(req.body);
    const trade = await this.service.createTrade(fromPlayerId, toPlayerId);
    res.status(201).json(trade);
  };

  addTradeItem = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { tradeId, inventoryItemId, quantity, direction } = addTradeItemSchema.parse(req.body);
    const item = await this.service.addTradeItem(playerId, tradeId, inventoryItemId, quantity, direction as any);
    res.status(201).json(item);
  };

  updateTradeStatus = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { tradeId, status } = updateTradeStatusSchema.parse(req.body);
    await this.service.updateTradeStatus(playerId, tradeId, status as any);
    res.status(204).send();
  };

  listTrades = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const trades = await this.service.listTrades(playerId);
    res.json(trades);
  };

  createAuction = async (req: Request, res: Response) => {
    const sellerId = this.getPlayerId(req);
    if (!sellerId) return res.status(400).json({ error: "BAD REQUEST" });
    const parsed = createAuctionSchema.parse(req.body);
    const auction = await this.service.createAuction(sellerId, {
      ...parsed,
      endsAt: new Date(parsed.endsAt)
    });
    res.status(201).json(auction);
  };

  listAuctions = async (_req: Request, res: Response) => {
    const auctions = await this.service.listAuctions();
    res.json(auctions);
  };

  bidAuction = async (req: Request, res: Response) => {
    const bidderId = this.getPlayerId(req);
    if (!bidderId) return res.status(400).json({ error: "BAD REQUEST" });
    const { auctionId, amount } = bidAuctionSchema.parse(req.body);
    const bid = await this.service.bidAuction(bidderId, auctionId, amount);
    res.status(201).json(bid);
  };

  createMarketListing = async (req: Request, res: Response) => {
    const sellerId = this.getPlayerId(req);
    if (!sellerId) return res.status(400).json({ error: "BAD REQUEST" });
    const parsed = createMarketListingSchema.parse(req.body);
    const listing = await this.service.createMarketListing(sellerId, parsed);
    res.status(201).json(listing);
  };

  listMarketListings = async (req: Request, res: Response) => {
    const { itemId } = req.query;
    const listings = await this.service.listMarketListings(itemId ? String(itemId) : undefined);
    res.json(listings);
  };

  npcBuy = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { storeId, itemId, quantity } = npcStoreBuySchema.parse(req.body);
    await this.service.npcBuy(playerId, storeId, itemId, quantity);
    res.status(204).send();
  };

  npcSell = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { storeId, inventoryItemId, quantity } = npcStoreSellSchema.parse(req.body);
    await this.service.npcSell(playerId, storeId, inventoryItemId, quantity);
    res.status(204).send();
  };
}
