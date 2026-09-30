// server/src/modules/trading/trading.schema.ts

import { z } from 'zod';

export const createTradeSchema = z.object({
  toPlayerId: z.string()
});

export const addTradeItemSchema = z.object({
  tradeId: z.string(),
  inventoryItemId: z.string(),
  quantity: z.number().int().min(1),
  direction: z.enum(['FROM', 'TO'])
});

export const updateTradeStatusSchema = z.object({
  tradeId: z.string(),
  status: z.enum(['ACCEPTED', 'REJECTED', 'CANCELLED'])
});

export const createAuctionSchema = z.object({
  inventoryItemId: z.string(),
  quantity: z.number().int().min(1),
  startingBid: z.number().int().min(1),
  buyoutPrice: z.number().int().optional(),
  endsAt: z.string().datetime()
});

export const bidAuctionSchema = z.object({
  auctionId: z.string(),
  amount: z.number().int().min(1)
});

export const createMarketListingSchema = z.object({
  itemId: z.string(),
  price: z.number().int().min(1),
  quantity: z.number().int().min(1),
  isBuyOrder: z.boolean().optional()
});

export const npcStoreBuySchema = z.object({
  storeId: z.string(),
  itemId: z.string(),
  quantity: z.number().int().min(1)
});

export const npcStoreSellSchema = z.object({
  storeId: z.string(),
  inventoryItemId: z.string(),
  quantity: z.number().int().min(1)
});
