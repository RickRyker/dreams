// server/src/players/mappers/PlayerMapper.ts

import { Player, Prisma } from "@prisma/client";
import type { PlayerProfileDomain, PlayerUpdateCommand } from "../domain/PlayerDomain";

type PlayerUpdateLike = {
  name?: string;
  isDefault?: boolean;
  mapId?: string | null;
  x?: number;
  y?: number;
};

export class PlayerMapper {
  static fromPrisma(model: Player): PlayerProfileDomain {
    return {
      id: model.id,
      name: model.name ?? `Player-${model.id}`,
      isDefault: model.isDefault,
      mapId: model.mapId,
      x: model.x,
      y: model.y,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toPrisma(update: PlayerUpdateLike | PlayerUpdateCommand): Prisma.PlayerUpdateInput {
    const data: Prisma.PlayerUpdateInput = {};

    if (update.name !== undefined) data.name = update.name;
    if (update.isDefault !== undefined) data.isDefault = update.isDefault;
    if (update.mapId !== undefined) {
      data.map = update.mapId
        ? { connect: { id: update.mapId } }
        : { disconnect: true };
    }
    if (update.x !== undefined) data.x = update.x;
    if (update.y !== undefined) data.y = update.y;

    return data;
  }
}
