// server/src/modules/monsters/monsters.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import {
  listMonstersController,
  getMonsterController,
  listMonsterTypesController,
  listMonsterSpawnsController,
  listMonsterDropsController
} from "./monsters.controller.js";

export const monstersRouter = Router();

monstersRouter.use(authMiddleware);
monstersRouter.get("/", async (_req, res) => res.json(await listMonstersController()));
monstersRouter.get("/types", async (_req, res) => res.json(await listMonsterTypesController()));
monstersRouter.get("/:monsterId", async (req, res) => res.json(await getMonsterController(req.params.monsterId)));
monstersRouter.get("/:monsterId/spawns", async (req, res) => res.json(await listMonsterSpawnsController(req.params.monsterId)));
monstersRouter.get("/:monsterId/drops", async (req, res) => res.json(await listMonsterDropsController(req.params.monsterId)));
