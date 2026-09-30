// server/src/players/routers/PlayerRouter.ts

import {Router} from "express";
import {PlayerRepository} from "../repositories/PlayerRepository";
import {PlayerBuffRepository} from "../repositories/PlayerBuffRepository";
import {PlayerStatsRepository} from "../repositories/PlayerStatsRepository";
import {PlayerInventoryRepository} from "../repositories/PlayerInventoryRepository";
import {PlayerQuestRepository} from "../repositories/PlayerQuestRepository";
import {PlayerSpellRepository} from "../repositories/PlayerSpellRepository";
import {PlayerSkillRepository} from "../repositories/PlayerSkillRepository";

import {PlayerHydrationAdapter} from "../adapters/PlayerHydrationAdapter";

import {PlayerBuffService} from "../services/PlayerBuffService";
import {PlayerCombatStateService} from "../services/PlayerCombatStateService";
import {PlayerCreationService} from "../services/PlayerCreationService";
import {PlayerDeathService} from "../services/PlayerDeathService";
import {PlayerDeleteService} from "../services/PlayerDeleteService";
import {PlayerEconomyService} from "../services/PlayerEconomyService";
import {PlayerListService} from "../services/PlayerListService";
import {PlayerMovementService} from "../services/PlayerMovementService";
import {PlayerQuestService} from "../services/PlayerQuestService";
import {PlayerSaveService} from "../services/PlayerSaveService";
import {PlayerSelectionService} from "../services/PlayerSelectionService";
import {PlayerTeleportService} from "../services/PlayerTeleportService";

import {createPlayerBuffRouter} from "./PlayerBuffRouter";
import {createPlayerCombatStateRouter} from "./PlayerCombatStateRouter";
import {createPlayerCreationRouter} from "./PlayerCreationRouter";
import {createPlayerDeathRouter} from "./PlayerDeathRouter";
import {createPlayerDeleteRouter} from "./PlayerDeleteRouter";
import {createPlayerEconomyRouter} from "./PlayerEconomyRouter";
import {createPlayerHydrationRouter} from "./PlayerHydrationRouter";
import {createPlayerListRouter} from "./PlayerListRouter";
import {createPlayerQuestsRouter} from "./PlayerQuestsRouter";
import {createPlayerSaveRouter} from "./PlayerSaveRouter";
import {createPlayerSelectionRouter} from "./PlayerSelectionRouter";
import {createPlayerTeleportRouter} from "./PlayerTeleportRouter";

import {PlayerBuffController} from "../controllers/PlayerBuffController";
import {PlayerCombatStateController} from "../controllers/PlayerCombatStateController";
import {PlayerCreationController} from "../controllers/PlayerCreationController";
import {PlayerDeathController} from "../controllers/PlayerDeathController";
import {PlayerDeleteController} from "../controllers/PlayerDeleteController";
import {PlayerEconomyController} from "../controllers/PlayerEconomyController";
import {PlayerFullHydrationController} from "../controllers/PlayerFullHydrationController";
import {PlayerListController} from "../controllers/PlayerListController";
import {PlayerMovementController} from "../controllers/PlayerMovementController";
import {PlayerQuestsController} from "../controllers/PlayerQuestsController";
import {PlayerSaveController} from "../controllers/PlayerSaveController";
import {PlayerSelectionController} from "../controllers/PlayerSelectionController";
import {PlayerTeleportController} from "../controllers/PlayerTeleportController";

import {requireAuth} from "../../middleware/AuthMiddleware";
import {createPlayerMovementRouter} from "./PlayerMovementRouter";
import {PlayerEquipmentRepository} from "../repositories/PlayerEquipmentRepository";
import {PlayerEquipmentService} from "../services/PlayerEquipmentService";
import {createPlayerEquipmentRouter} from "./PlayerEquipmentRouter";
import {PlayerHydrationService} from "../services/PlayerHydrationService";
import {PlayerEquipmentController} from "../controllers/PlayerEquipmentController";
import {QuestRepository} from "../../quests/repositories/QuestRepository";
import {PlayerInventoryService} from "../services/PlayerInventoryService";

export function createPlayerRouter() {
  const router = Router();

  // --- Player module wiring ---
  const buffRepo = new PlayerBuffRepository();
  const equipRepo = new PlayerEquipmentRepository();
  const inventoryRepo = new PlayerInventoryRepository();
  const playerRepo = new PlayerRepository();
  const playerQuestRepo = new PlayerQuestRepository();
  const questRepo = new QuestRepository();
  const skillRepo = new PlayerSkillRepository();
  const spellRepo = new PlayerSpellRepository();
  const statsRepo = new PlayerStatsRepository();

  const buffSvc = new PlayerBuffService(buffRepo);
  const combatSvc = new PlayerCombatStateService(playerRepo);
  const creationSvc = new PlayerCreationService(playerRepo, statsRepo, inventoryRepo, spellRepo, skillRepo);
  const deathSvc = new PlayerDeathService(playerRepo);
  const deletionSvc = new PlayerDeleteService(playerRepo);
  const econSvc = new PlayerEconomyService(playerRepo, statsRepo);
  const equipSvc = new PlayerEquipmentService(equipRepo);
  const inventorySvc = new PlayerInventoryService(playerRepo, inventoryRepo);
  const listSvc = new PlayerListService(playerRepo);
  const moveSvc = new PlayerMovementService(playerRepo);
  const questSvc = new PlayerQuestService(playerRepo, playerQuestRepo, questRepo, inventoryRepo, skillRepo, spellRepo);
  const saveSvc = new PlayerSaveService(playerRepo);
  const teleportSvc = new PlayerTeleportService(playerRepo);

  const hydrationAdapter = new PlayerHydrationAdapter(playerRepo);
  const hydrationSvc = new PlayerHydrationService(questSvc, hydrationAdapter);
  const selectionSvc = new PlayerSelectionService(playerRepo, hydrationAdapter);

  const buff = new PlayerBuffController(buffSvc);
  const combat = new PlayerCombatStateController(combatSvc);
  const creation = new PlayerCreationController(creationSvc);
  const death = new PlayerDeathController(deathSvc);
  const deletion = new PlayerDeleteController(deletionSvc);
  const econ = new PlayerEconomyController(econSvc);
  const equip = new PlayerEquipmentController(equipSvc);
  const hydration = new PlayerFullHydrationController(hydrationSvc);
  const list = new PlayerListController(listSvc);
  const move = new PlayerMovementController(moveSvc);
  const quest = new PlayerQuestsController(questSvc);
  const save = new PlayerSaveController(saveSvc);
  const selection = new PlayerSelectionController(selectionSvc);
  const teleport = new PlayerTeleportController(teleportSvc);

  router.use("/buff", requireAuth, createPlayerBuffRouter(buff));
  router.use("/combat", requireAuth, createPlayerCombatStateRouter(combat));
  router.use("/create", requireAuth, createPlayerCreationRouter(creation));
  router.use("/death", requireAuth, createPlayerDeathRouter(death));
  router.use("/delete", requireAuth, createPlayerDeleteRouter(deletion));
  router.use("/econ", requireAuth, createPlayerEconomyRouter(econ));
  router.use("/equip", requireAuth, createPlayerEquipmentRouter(equip));
  router.use("/full", requireAuth, createPlayerHydrationRouter(hydration));
  router.use("/full", requireAuth, createPlayerHydrationRouter(hydration));
  router.use("/list", requireAuth, createPlayerListRouter(list));
  router.use("/move", requireAuth, createPlayerMovementRouter(move));
  router.use("/quest", requireAuth, createPlayerQuestsRouter(quest));
  router.use("/save", requireAuth, createPlayerSaveRouter(save));
  router.use("/select", requireAuth, createPlayerSelectionRouter(selection));
  router.use("/teleport", requireAuth, createPlayerTeleportRouter(teleport));

  return router;
}
