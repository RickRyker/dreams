// server/src/modules/skills/skills.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import { addSkillXpSchema } from "./skills.schema.js";
import { SkillsRepository } from "./SkillsRepository.js";
import { SkillsService } from "./SkillsService.js";
import { SkillsController } from "./SkillsController.js";

export function createSkillsRouter() {
  const router = Router();
  const repository = new SkillsRepository();
  const service = new SkillsService(repository);
  const controller = new SkillsController(service);

  router.use(authMiddleware);

  router.get("/", (req, res) => controller.listSkills(req, res));
  router.get("/:skillId", (req, res) => controller.getSkillById(req, res));
  router.get("/player/:playerId", (req, res) => controller.listPlayerSkills(req, res));

  router.post("/:playerId/add-xp", async (req, res, next) => {
    try {
      const parsed = addSkillXpSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      return controller.addSkillXp(req, res);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/:playerId/initialize", (req, res) => controller.initializePlayerSkills(req, res));

  return router;
}

export const skillsRouter = createSkillsRouter();
