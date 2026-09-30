// server/src/modules/spells/spells.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import { learnSpellSchema } from "./spells.schema.js";
import { SpellsRepository } from "./SpellsRepository.js";
import { SpellsService } from "./SpellsService.js";
import { SpellsController } from "./SpellsController.js";

export function createSpellsRouter() {
  const router = Router();
  const repository = new SpellsRepository();
  const service = new SpellsService(repository);
  const controller = new SpellsController(service);

  router.use(authMiddleware);
  router.get("/", (req, res) => controller.listSpells(req, res));
  router.get("/:spellId", (req, res) => controller.getSpellById(req, res));
  router.get("/player/:playerId", (req, res) => controller.listPlayerSpells(req, res));

  router.post("/:playerId/learn", async (req, res, next) => {
    try {
      const parsed = learnSpellSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      return controller.learnSpell(req, res);
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:playerId/:spellId", (req, res) => controller.unlearnSpell(req, res));

  return router;
}

export const spellsRouter = createSpellsRouter();
