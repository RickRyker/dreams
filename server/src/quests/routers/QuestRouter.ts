// server/src/quests/routers/QuestRouter.ts

import { Router } from "express";
import { QuestController } from "../controllers/QuestController";
import { QuestService } from "../services/QuestService";
import { QuestRepository } from "../repositories/QuestRepository";
import { QuestAuthorizationService } from "../services/QuestAuthorizationService";
import { QuestVersioningService } from "../services/QuestVersioningService";
import { validateQuestEditorPayload } from "../middleware/validateQuestEditorPayload";
import { requireAuth } from "../../middleware/AuthMiddleware";

/**
 * Factory function to create and configure the quests router
 */
export function createQuestRouter(): Router {

  const router = Router();

  const repo = new QuestRepository();
  const auth = new QuestAuthorizationService();
  const versioning = new QuestVersioningService();
  const service = new QuestService(repo, auth, versioning);
  const controller = new QuestController(service);

  // Public
  router.get("/:id", controller.getById.bind(controller));
  router.get("/slug/:slug", controller.getBySlug.bind(controller));
  router.get("/", controller.search.bind(controller));

  // Authenticated
  router.post(
    "/player/:playerId",
    requireAuth,
    validateQuestEditorPayload,
    controller.create.bind(controller)
  );

  router.put(
    "/:id/player/:playerId",
    requireAuth,
    validateQuestEditorPayload,
    controller.update.bind(controller)
  );

  router.delete(
    "/:id/player/:playerId",
    requireAuth,
    controller.delete.bind(controller)
  );

  /*
    const questRepo = new QuestRepository();
    const reqRepo = new QuestRequirementRepository();
    const rewardRepo = new QuestRewardRepository();
    const depRepo = new QuestDependencyRepository();

    const questSvc = new QuestService(questRepo, reqRepo, rewardRepo, depRepo, authSvc, versioningSvc);
    const searchSvc = new QuestSearchService(questRepo);
    const validationSvc = new QuestValidationService(questRepo, reqRepo, rewardRepo, depRepo);
    const graphSvc = new QuestGraphService(questRepo, depRepo);

    const quest = new QuestController(questSvc, searchSvc);
    const validate = new QuestValidationController(validationSvc);
    const graph = new QuestGraphController(graphSvc);

    router.get("/", authMiddleware, quest.search);
    router.post("/", authMiddleware, quest.create);
    router.get("/:id", authMiddleware, quest.getById);
    router.get("/slug/:slug", authMiddleware, quest.getBySlug);
    router.patch("/:id", authMiddleware, quest.update);
    router.delete("/:id", authMiddleware, quest.delete);

    router.post("/:id/publish", authMiddleware, quest.publish);
    router.post("/:id/retire", authMiddleware, quest.retire);

    router.get("/:id/requirements", authMiddleware, quest.listRequirements);
    router.post("/:id/requirements", authMiddleware, quest.addRequirement);
    router.put("/:id/requirements", authMiddleware, quest.replaceRequirements);
    router.delete("/:id/requirements/:reqId", authMiddleware, quest.removeRequirement);

    router.get("/:id/rewards", authMiddleware, quest.listRewards);
    router.post("/:id/rewards", authMiddleware, quest.addReward);
    router.put("/:id/rewards", authMiddleware, quest.replaceRewards);
    router.delete("/:id/rewards/:rewardId", authMiddleware, quest.removeReward);

    router.get("/validate/graph", authMiddleware, validate.globalGraphCheck);
    router.get("/:id/validate", authMiddleware, validate.validateQuest);
    router.post("/:id/validate/eligibility", authMiddleware, validate.validateEligibility);
    router.post("/:id/validate/player/:playerId", authMiddleware, validate.validatePlayerEligibility);

    router.get("/graph/index", authMiddleware, graph.globalIndex);
    router.get("/:id/graph/dependencies", authMiddleware, graph.dependencies);
    router.get("/:id/graph/flow", authMiddleware, graph.flow);
  */

  return router;
}
