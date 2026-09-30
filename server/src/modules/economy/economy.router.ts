// server/src/modules/economy/economy.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import {
  getTaxRatesController,
  getVendorPricingController,
  applyGoldSinkController
} from "./economy.controller.js";
import { goldSinkSchema } from "./economy.schema.js";

export const economyRouter = Router();

economyRouter.use(authMiddleware);
economyRouter.get("/tax", async (_req, res) => res.json(await getTaxRatesController()));
economyRouter.get("/pricing", async (_req, res) => res.json(await getVendorPricingController()));
economyRouter.post("/:playerId/sink", async (req, res, next) => {
  try {
    const parsed = goldSinkSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await applyGoldSinkController(req.params.playerId, parsed.data.type, parsed.data.amount));
  } catch (error) {
    return next(error);
  }
});
