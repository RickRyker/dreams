// server/src/modules/maps/maps.service.ts

import { AppError } from "../../errors/AppError";
import { MapsMapper } from "./maps.mapper";
import { MapsRepository } from "./maps.repository";

export class MapsService {
  constructor(
    private repository: MapsRepository,
    private mapper: MapsMapper,
  ) {}

  async getMapById(mapId: string) {
    const map = await this.repository.getMapById(mapId);
    if (!map) throw new AppError("Map not found", 404);
    return this.mapper.toMapDto(map);
  }

  async getMapTiles(mapId: string) {
    return (await this.repository.getMapTiles(mapId)).map((tile) => this.mapper.toMapTileDto(tile));
  }

  async getTileAt(mapId: string, x: number, y: number) {
    const tile = await this.repository.getTileAt(mapId, x, y);
    if (!tile) throw new AppError("Tile not found", 404);
    return this.mapper.toMapTileDto(tile);
  }

  async getMapEvents(mapId: string) {
    return (await this.repository.getMapEvents(mapId)).map((event) => this.mapper.toMapEventDto(event));
  }

  async triggerTransition(mapId: string, x: number, y: number) {
    const event = await this.repository.findTransitionEvent(mapId, x, y);
    if (!event) throw new AppError("No transition event at this location", 404);
    if (!event.action) throw new AppError("Event has no action", 400);
    if (event.action.type !== "TRANSITION") throw new AppError("Event is not a transition", 400);

    return {
      targetMapId: event.action.mapId,
      targetX: event.action.x,
      targetY: event.action.y,
      message: event.action.message,
    };
  }

  async getLocationsForMap(mapId: string) {
    return (await this.repository.getLocationsForMap(mapId)).map((location) => this.mapper.toLocationDto(location));
  }
}
