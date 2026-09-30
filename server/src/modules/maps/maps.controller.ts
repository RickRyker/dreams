// server/src/modules/maps/maps.controller.ts

import type { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { MapsService } from "./maps.service";

export class MapsController {
  constructor(private service: MapsService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  getMap = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getMapById(this.readParam(req.params, "mapId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getTiles = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getMapTiles(this.readParam(req.params, "mapId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getTile = async (req: Request, res: Response) => {
    try {
      const mapId = this.readParam(req.params, "mapId");
      const x = Number(req.query.x);
      const y = Number(req.query.y);
      return res.json(await this.service.getTileAt(mapId, x, y));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getEvents = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getMapEvents(this.readParam(req.params, "mapId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  transition = async (req: Request, res: Response) => {
    try {
      const { mapId, x, y } = req.body;
      return res.json(await this.service.triggerTransition(mapId, x, y));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getLocations = async (req: Request, res: Response) => {
    try {
      return res.json(await this.service.getLocationsForMap(this.readParam(req.params, "mapId")));
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
