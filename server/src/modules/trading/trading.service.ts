// server/src/modules/trading/trading.service.ts

import {PrismaClient, TradeDirection, TradeStatus} from '@prisma/client';

export class TradingService {
  constructor(private prisma: PrismaClient) {}

  // -------------------------
  // Trades
  // -------------------------

  createTrade(fromPlayerId: string, toPlayerId: string) {
    return this.prisma.trade.create({
      data: {
        fromPlayerId,
        toPlayerId,
        status: TradeStatus.PENDING
      }
    });
  }

  addTradeItem(
    playerId: string,
    tradeId: string,
    inventoryItemId: string,
    quantity: number,
    direction: TradeDirection
  ) {
    return this.prisma.$transaction(async tx => {
      const trade = await tx.trade.findUnique({ where: { id: tradeId } });
      if (!trade) throw new Error('Trade not found');
      if (![trade.fromPlayerId, trade.toPlayerId].includes(playerId)) {
        throw new Error('Not part of trade');
      }
      if (trade.status !== TradeStatus.PENDING) {
        throw new Error('Trade not pending');
      }

      const inv = await tx.inventoryItem.findUnique({ where: { id: inventoryItemId } });
      if (!inv || inv.playerId !== playerId) throw new Error('Item not owned');
      if (inv.quantity < quantity) throw new Error('Not enough quantity');

      return tx.tradeItem.create({
        data: {
          tradeId,
          itemId: inventoryItemId, // TradeItem.itemId -> InventoryItem.id
          ownerId: playerId,
          quantity,
          direction
        }
      });
    });
  }

  async updateTradeStatus(playerId: string, tradeId: string, status: TradeStatus) {
    const trade = await this.prisma.trade.findUnique({
      where: { id: tradeId },
      include: {
        items: {
          include: {
            item: true // InventoryItem
          }
        }
      }
    });
    if (!trade) throw new Error('Trade not found');

    // Only toPlayer can accept; either side can cancel/reject
    if (status === TradeStatus.ACCEPTED && playerId !== trade.toPlayerId) {
      throw new Error('Only recipient can accept trade');
    }
    if (trade.status !== TradeStatus.PENDING) {
      throw new Error('Trade not pending');
    }

    if (status !== TradeStatus.ACCEPTED) {
      await this.prisma.trade.update({
        where: { id: tradeId },
        data: { status }
      });
      return;
    }

    // ACCEPTED: atomic transfer
    await this.prisma.$transaction(async tx => {
      const freshTrade = await tx.trade.findUnique({
        where: { id: tradeId },
        include: {
          items: {
            include: { item: true }
          }
        }
      });
      if (!freshTrade || freshTrade.status !== TradeStatus.PENDING) {
        throw new Error('Trade not pending');
      }

      // 1. Validate ownership and quantities
      for (const ti of freshTrade.items) {
        const inv = await tx.inventoryItem.findUnique({
          where: { id: ti.itemId }
        });
        if (!inv || inv.playerId !== ti.ownerId) {
          throw new Error('Item no longer owned');
        }
        if (inv.quantity < ti.quantity) {
          throw new Error('Insufficient quantity');
        }
      }

      // 2. Apply transfers
      for (const ti of freshTrade.items) {
        const from = ti.ownerId;
        const to =
          ti.direction === TradeDirection.FROM
            ? freshTrade.toPlayerId
            : freshTrade.fromPlayerId;

        // subtract from owner stack
        await tx.inventoryItem.update({
          where: { id: ti.itemId },
          data: { quantity: { decrement: ti.quantity } }
        });

        // add to receiver (by base item id)
        const receiverItem = await tx.inventoryItem.findFirst({
          where: {
            playerId: to,
            itemId: ti.item.itemId
          }
        });
        if (receiverItem) {
          await tx.inventoryItem.update({
            where: { id: receiverItem.id },
            data: { quantity: { increment: ti.quantity } }
          });
        } else {
          await tx.inventoryItem.create({
            data: {
              playerId: to,
              itemId: ti.item.itemId,
              quantity: ti.quantity,
              isDroppable: ti.item.isDroppable,
              isTradeable: ti.item.isTradeable
            }
          });
        }
      }

      // 3. Mark trade as accepted
      await tx.trade.update({
        where: { id: tradeId },
        data: { status: TradeStatus.ACCEPTED }
      });
    });
  }

  listTrades(playerId: string) {
    return this.prisma.trade.findMany({
      where: {
        OR: [{ fromPlayerId: playerId }, { toPlayerId: playerId }]
      },
      include: {
        items: {
          include: {
            item: true,
            owner: true
          }
        }
      }
    });
  }

  // -------------------------
  // Auctions
  // -------------------------

  createAuction(
    sellerId: string,
    data: {
      inventoryItemId: string;
      quantity: number;
      startingBid: number;
      buyoutPrice?: number;
      endsAt: Date;
    }
  ) {
    return this.prisma.auction.create({
      data: {
        sellerId,
        inventoryItemId: data.inventoryItemId,
        quantity: data.quantity,
        startingBid: data.startingBid,
        buyoutPrice: data.buyoutPrice,
        endsAt: data.endsAt
      }
    });
  }

  listAuctions() {
    return this.prisma.auction.findMany({
      where: { isActive: true },
      include: {
        inventoryItem: { include: { item: true } },
        seller: true,
        currentBid: true
      }
    });
  }

  async bidAuction(bidderId: string, auctionId: string, amount: number) {
    return this.prisma.$transaction(async tx => {
      const auction = await tx.auction.findUnique({
        where: { id: auctionId },
        include: { currentBid: true }
      });
      if (!auction || !auction.isActive) throw new Error('Auction not active');
      if (auction.endsAt < new Date()) throw new Error('Auction ended');

      const minBid = auction.currentBid
        ? auction.currentBid.amount + 1
        : auction.startingBid;
      if (amount < minBid) throw new Error('Bid too low');

      const bid = await tx.auctionBid.create({
        data: {
          auctionId,
          bidderId,
          amount
        }
      });

      await tx.auction.update({
        where: { id: auctionId },
        data: { currentBidId: bid.id }
      });

      return bid;
    });
  }

  // -------------------------
  // Market Listings
  // -------------------------

  createMarketListing(
    sellerId: string,
    data: {
      itemId: string;
      price: number;
      quantity: number;
      isBuyOrder?: boolean;
    }
  ) {
    return this.prisma.marketListing.create({
      data: {
        sellerId,
        itemId: data.itemId,
        price: data.price,
        quantity: data.quantity,
        isBuyOrder: data.isBuyOrder ?? false
      }
    });
  }

  listMarketListings(itemId?: string) {
    return this.prisma.marketListing.findMany({
      where: {
        isActive: true,
        ...(itemId ? { itemId } : {})
      },
      include: { item: true, seller: true }
    });
  }

  async fulfillMarketListing(buyerId: string, listingId: string, quantity: number) {
    await this.prisma.$transaction(async tx => {
      const listing = await tx.marketListing.findUnique({
        where: { id: listingId },
        include: { item: true, seller: true }
      });
      if (!listing || !listing.isActive) throw new Error('Listing not active');
      if (listing.quantity < quantity) throw new Error('Not enough quantity');

      const playerStats = await tx.playerStats.findUnique({
        where: { playerId: buyerId }
      });
      if (!playerStats) throw new Error('Player stats not found');

      const totalPrice = listing.price * quantity;
      if (playerStats.gold < totalPrice) throw new Error('Not enough gold');

      // buyer pays
      await tx.playerStats.update({
        where: { playerId: buyerId },
        data: { gold: { decrement: totalPrice } }
      });

      // seller receives (if not a buy order)
      if (!listing.isBuyOrder && listing.sellerId) {
        await tx.playerStats.update({
          where: { playerId: listing.sellerId },
          data: { gold: { increment: totalPrice } }
        });
      }

      // give items to buyer
      const buyerItem = await tx.inventoryItem.findFirst({
        where: { playerId: buyerId, itemId: listing.itemId }
      });
      if (buyerItem) {
        await tx.inventoryItem.update({
          where: { id: buyerItem.id },
          data: { quantity: { increment: quantity } }
        });
      } else {
        await tx.inventoryItem.create({
          data: {
            playerId: buyerId,
            itemId: listing.itemId,
            quantity,
            isDroppable: true,
            isTradeable: true
          }
        });
      }

      const remaining = listing.quantity - quantity;
      await tx.marketListing.update({
        where: { id: listingId },
        data: {
          quantity: remaining,
          isActive: remaining > 0
        }
      });
    });
  }

  // -------------------------
  // NPC Store
  // -------------------------

  async npcBuy(playerId: string, storeId: string, itemId: string, quantity: number) {
    await this.prisma.$transaction(async tx => {
      const storeItem = await tx.npcStoreItem.findFirst({
        where: { storeId, itemId },
        include: { item: true }
      });
      if (!storeItem) throw new Error('Store item not found');
      if (storeItem.stock !== null && storeItem.stock < quantity) {
        throw new Error('Not enough stock');
      }

      const playerStats = await tx.playerStats.findUnique({ where: { playerId } });
      if (!playerStats || playerStats.gold < storeItem.buyPrice * quantity) {
        throw new Error('Not enough gold');
      }

      await tx.playerStats.update({
        where: { playerId },
        data: { gold: { decrement: storeItem.buyPrice * quantity } }
      });

      await tx.inventoryItem.create({
        data: {
          itemId,
          quantity,
          isDroppable: true,
          isTradeable: true,
          playerId
        }
      });

      if (storeItem.stock !== null) {
        await tx.npcStoreItem.update({
          where: { id: storeItem.id },
          data: { stock: { decrement: quantity } }
        });
      }
    });
  }

  async npcSell(playerId: string, storeId: string, inventoryItemId: string, quantity: number) {
    await this.prisma.$transaction(async tx => {
      const inv = await tx.inventoryItem.findUnique({
        where: { id: inventoryItemId },
        include: { item: true }
      });
      if (!inv || inv.playerId !== playerId) throw new Error('Item not owned');
      if (inv.quantity < quantity) throw new Error('Not enough quantity');

      const storeItem = await tx.npcStoreItem.findFirst({
        where: { storeId, itemId: inv.itemId }
      });
      if (!storeItem) throw new Error('Store does not buy this item');

      await tx.playerStats.update({
        where: { playerId },
        data: { gold: { increment: storeItem.sellPrice * quantity } }
      });

      if (inv.quantity === quantity) {
        await tx.inventoryItem.delete({ where: { id: inv.id } });
      } else {
        await tx.inventoryItem.update({
          where: { id: inv.id },
          data: { quantity: { decrement: quantity } }
        });
      }
    });
  }
}
