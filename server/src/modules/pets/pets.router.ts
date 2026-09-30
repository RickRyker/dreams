// server/src/modules/pets/pets.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import {
  listPetsController,
  getPetController,
  renamePetController,
  selectPetController,
  feedPetController,
  hatchPetController
} from "./pets.controller.js";
import {
  renamePetSchema,
  selectPetSchema,
  feedPetSchema,
  hatchPetSchema
} from "./pets.schema.js";

export const petsRouter = Router();

petsRouter.use(authMiddleware);

petsRouter.get("/:playerId", async (req, res) => res.json(await listPetsController(req.params.playerId)));
petsRouter.get("/:playerId/:petId", async (req, res) => res.json(await getPetController(req.params.playerId, req.params.petId)));

petsRouter.post("/:playerId/:petId/rename", async (req, res, next) => {
  try {
    const parsed = renamePetSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await renamePetController(req.params.playerId, req.params.petId, parsed.data.name));
  } catch (error) {
    return next(error);
  }
});

petsRouter.post("/:playerId/select", async (req, res, next) => {
  try {
    const parsed = selectPetSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await selectPetController(req.params.playerId, parsed.data.petId));
  } catch (error) {
    return next(error);
  }
});

petsRouter.post("/:playerId/feed", async (req, res, next) => {
  try {
    const parsed = feedPetSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await feedPetController(req.params.playerId, parsed.data.petId, parsed.data.amount));
  } catch (error) {
    return next(error);
  }
});

petsRouter.post("/:playerId/hatch", async (req, res, next) => {
  try {
    const parsed = hatchPetSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await hatchPetController(req.params.playerId, parsed.data.petId));
  } catch (error) {
    return next(error);
  }
});
