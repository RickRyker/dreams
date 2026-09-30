// server/src/modules/titles/titles.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import { equipTitleSchema } from "./titles.schema.js";
import { TitlesRepository } from "./TitlesRepository.js";
import { TitlesService } from "./TitlesService.js";
import { TitlesController } from "./TitlesController.js";

export function createTitlesRouter() {
  const router = Router();
  const repository = new TitlesRepository();
  const service = new TitlesService(repository);
  const controller = new TitlesController(service);

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.listTitles(req, res));
  router.get("/player/:playerId", (req, res) => controller.listPlayerTitles(req, res));
  router.get("/:playerId/current", (req, res) => controller.getCurrentTitle(req, res));

  router.post("/:playerId/award", async (req, res, next) => {
    try {
      const parsed = equipTitleSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      return controller.awardTitle(req, res);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/:playerId/equip", async (req, res, next) => {
    try {
      const parsed = equipTitleSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      return controller.equipTitle(req, res);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/:playerId/unequip", (req, res) => controller.unequipTitle(req, res));

  return router;
}

export const titlesRouter = createTitlesRouter();
