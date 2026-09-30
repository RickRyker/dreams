// server/src/modules/maps/maps.repository.ts

import { prisma } from "@prisma";
import { Prisma } from "@prisma/client";

export class MapsRepository {
  async getMapById(mapId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.map.findUnique({
      where: { id: mapId },
      include: {
        tiles: { include: { tileDefinition: true } },
        events: { include: { action: true } },
      },
    });
  }

  async getMapTiles(mapId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.mapTile.findMany({
      where: { mapId },
      include: { tileDefinition: true },
    });
  }

  async getTileAt(mapId: string, x: number, y: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.mapTile.findFirst({
      where: { mapId, x, y },
      include: { tileDefinition: true },
    });
  }

  async getMapEvents(mapId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.mapEvent.findMany({
      where: { mapId },
      include: { action: true },
    });
  }

  async findTransitionEvent(mapId: string, x: number, y: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.mapEvent.findFirst({
      where: { mapId, x, y },
      include: { action: true },
    });
  }

  async getLocationsForMap(mapId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.location.findMany({
      where: { mapId },
    });
  }
}
