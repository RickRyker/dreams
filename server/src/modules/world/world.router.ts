// server/src/modules/world/world.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware.js";
import {
  getWorldConfigController,
  getSettingController,
  updateSettingController,
  toggleMaintenanceController
} from "./world.controller.js";
import {
  updateSettingSchema,
  maintenanceToggleSchema
} from "./world.schema.js";
import { WorldConfigSettingType } from "@prisma/client";

export const worldRouter = Router();

const parseSettingName = (name: string): WorldConfigSettingType => {
  if (Object.values(WorldConfigSettingType).includes(name as WorldConfigSettingType)) {
    return name as WorldConfigSettingType;
  }

  throw new Error("Invalid setting name");
};

worldRouter.use(authMiddleware);

worldRouter.get("/", async (_req, res) => {
  res.json(await getWorldConfigController());
});

worldRouter.get("/setting/:name", async (req, res, next) => {
  try {
    const setting = await getSettingController(parseSettingName(req.params.name ?? ""));
    return res.json(setting);
  } catch (error) {
    return next(error);
  }
});

worldRouter.post("/setting", async (req, res, next) => {
  try {
    const parsed = updateSettingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await updateSettingController(parsed.data.name, parsed.data.value));
  } catch (error) {
    return next(error);
  }
});

worldRouter.post("/maintenance", async (req, res, next) => {
  try {
    const parsed = maintenanceToggleSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    return res.json(await toggleMaintenanceController(parsed.data.enabled));
  } catch (error) {
    return next(error);
  }
});
