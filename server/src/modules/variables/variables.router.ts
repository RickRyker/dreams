// server/src/modules/variables/variables.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import {
  listVariablesController,
  getVariableController,
  setVariableController,
  deleteVariableController
} from "./variables.controller.js";
import { setVariableSchema } from "./variables.schema.js";

export const variablesRouter = Router();

variablesRouter.use(authMiddleware);

const normalizeParam = (value: string | undefined) => value ?? "";

variablesRouter.get("/:playerId", async (req, res, next) => {
  try {
    return res.json(await listVariablesController(normalizeParam(req.params.playerId)));
  } catch (error) {
    return next(error);
  }
});

variablesRouter.get("/:playerId/:name", async (req, res, next) => {
  try {
    return res.json(
      await getVariableController(
        normalizeParam(req.params.playerId),
        normalizeParam(req.params.name)
      )
    );
  } catch (error) {
    return next(error);
  }
});

variablesRouter.post("/:playerId", async (req, res, next) => {
  try {
    const parsed = setVariableSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(
      await setVariableController(normalizeParam(req.params.playerId), parsed.data.name, parsed.data.value)
    );
  } catch (error) {
    return next(error);
  }
});

variablesRouter.delete("/:playerId/:name", async (req, res, next) => {
  try {
    return res.json(
      await deleteVariableController(
        normalizeParam(req.params.playerId),
        normalizeParam(req.params.name)
      )
    );
  } catch (error) {
    return next(error);
  }
});
