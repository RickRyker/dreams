// server/src/modules/economy/economy.service.ts

import { prisma } from "@prisma";

export const getTaxRates = async () =>
  [];

export const getVendorPricing = async () =>
  prisma.npcStoreItem.findMany({
    include: { item: true, store: true }
  });

export const applyGoldSink = async (playerId: string, type: string, amount: number) => {
  await prisma.playerStats.update({
    where: { playerId },
    data: { gold: { decrement: amount } }
  });

  return { playerId, type, amount };
};
