// server/src/modules/auctions/auctions.service.ts

import {prisma} from "@prisma";

/*
await prisma.$transaction(async (tx) => {
  // 1. Lock the auction row
  const auction = await tx.auction.findUnique({
    where: { id: auctionId },
    include: { currentBid: true },
  });

  if (!auction || !auction.isActive) throw new Error("Auction inactive");
  if (auction.endsAt < new Date()) throw new Error("Auction ended");

  // 2. Validate bid amount
  const minBid = auction.currentBid
    ? auction.currentBid.amount + 1
    : auction.startingBid;

  if (amount < minBid) throw new Error("Bid too low");

  // 3. Create the bid
  const bid = await tx.auctionBid.create({
    data: {
      auctionId,
      bidderId: playerId,
      amount,
    },
  });

  // 4. Update current bid pointer
  await tx.auction.update({
    where: { id: auctionId },
    data: { currentBidId: bid.id },
  });

  return bid;
});
*/