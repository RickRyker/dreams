// server/src/modules/maps/maps.router.ts

import { Router } from "express";
import { authMiddleware } from "../../auth/middleware";
import { tileQuerySchema, transitionSchema } from "./map.schema";
import { MapsRepository } from "./maps.repository";
import { MapsMapper } from "./maps.mapper";
import { MapsService } from "./maps.service";
import { MapsController } from "./maps.controller";

export const mapsRouter = Router();

const repository = new MapsRepository();
const mapper = new MapsMapper();
const service = new MapsService(repository, mapper);
const controller = new MapsController(service);

mapsRouter.use(authMiddleware);

mapsRouter.get("/:mapId", controller.getMap);
mapsRouter.get("/:mapId/tiles", controller.getTiles);
mapsRouter.get("/:mapId/tile", (req, res) => {
  const parsed = tileQuerySchema.safeParse({ x: Number(req.query.x), y: Number(req.query.y) });
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return controller.getTile(req, res);
});
mapsRouter.get("/:mapId/events", controller.getEvents);
mapsRouter.post("/transition", (req, res) => {
  const parsed = transitionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return controller.transition(req, res);
});
mapsRouter.get("/:mapId/locations", controller.getLocations);
