// server/src/guilds/routers/GuildTreasuryRouter.ts


import { Router } from "express";
import { GuildTreasuryController } from "../controllers/GuildTreasuryController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createGuildTreasuryRouter(controller: GuildTreasuryController) {
  const router = Router({ mergeParams: true });

  router.post("/players/:playerId/items/:itemId/donate", requireAuth, controller.donateItem);
  router.post("/players/:playerId/items/:itemId/return", requireAuth, controller.returnItem);
  router.post("/players/:playerId/items/:itemId/borrow", requireAuth, controller.borrowItem);
  router.post("/players/:playerId/items/:itemId/withdraw", requireAuth, controller.withdrawItem);

  router.get("/items", requireAuth, controller.listTreasuryItems);
  router.get("/players/:playerId/items/borrowed", requireAuth, controller.listBorrowedItems);

  return router;
}
