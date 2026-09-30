// server/src/modules/inventory/inventory.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { equipItemSchema, unequipItemSchema, moveItemSchema, dropItemSchema, pickupItemSchema } from "./inventory.schema";
import { InventoryController } from "./inventory.controller";
import { InventoryRepository } from "./inventory.repository";
import { InventoryMapper } from "./inventory.mapper";
import { InventoryService } from "./inventory.service";

export const inventoryRouter = Router();

const repository = new InventoryRepository();
const mapper = new InventoryMapper();
const service = new InventoryService(repository, mapper);
const controller = new InventoryController(service);

inventoryRouter.use(authMiddleware);

inventoryRouter.get("/:playerId", controller.listInventory);
inventoryRouter.get("/:playerId/equipment", controller.listEquipment);
inventoryRouter.post("/:playerId/equip", (req, res) => {
  const parsed = equipItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.equipItem(req, res);
});
inventoryRouter.post("/:playerId/unequip", (req, res) => {
  const parsed = unequipItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.unequipItem(req, res);
});
inventoryRouter.post("/:playerId/move", (req, res) => {
  const parsed = moveItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.moveItem(req, res);
});
inventoryRouter.post("/:playerId/drop", (req, res) => {
  const parsed = dropItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.dropItem(req, res);
});
inventoryRouter.post("/:playerId/pickup", (req, res) => {
  const parsed = pickupItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.pickupItem(req, res);
});
