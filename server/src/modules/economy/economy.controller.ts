// server/src/modules/economy/economy.controller.ts

import {
  getTaxRates,
  getVendorPricing,
  applyGoldSink
} from './economy.service.js';

export const getTaxRatesController = async () => getTaxRates();
export const getVendorPricingController = async () => getVendorPricing();
export const applyGoldSinkController = async (playerId: string, type: string, amount: number) =>
  applyGoldSink(playerId, type, amount);
