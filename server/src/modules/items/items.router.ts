// server/src/modules/items/items.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { craftItemSchema } from "./items.schema";
import { ItemsRepository } from "./items.repository";
import { ItemsMapper } from "./items.mapper";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";

export const itemsRouter = Router();

const repository = new ItemsRepository();
const mapper = new ItemsMapper();
const service = new ItemsService(repository, mapper);
const controller = new ItemsController(service);

itemsRouter.use(authMiddleware);
itemsRouter.get("/", controller.listItems);
itemsRouter.get("/categories", controller.listCategories);
itemsRouter.get("/rarities", controller.listRarities);
itemsRouter.get("/recipes", controller.listRecipes);
itemsRouter.get("/:itemId", controller.getItem);
itemsRouter.post("/:playerId/craft", (req, res) => {
  const parsed = craftItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.craftItem(req, res);
});
