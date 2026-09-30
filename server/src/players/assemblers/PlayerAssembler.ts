// server/src/players/assemblers/PlayerAssembler.ts

import type { PlayerDto, PlayerListDto } from "shared";
import type { PlayerCreateCommand, PlayerListItemDomain, PlayerProfileDomain, PlayerUpdateCommand } from "../domain/PlayerDomain";

export interface PlayerCreateRequestDto {
  name?: string;
}

export class PlayerAssembler {
  static toCreateCommand(accountId: string, dto: PlayerCreateRequestDto): PlayerCreateCommand {
    return {
      accountId,
      name: dto.name ?? null,
    };
  }

  static toUpdateCommand(dto: PlayerUpdateCommand): PlayerUpdateCommand {
    return dto;
  }

  static toPlayerDto(player: PlayerProfileDomain): PlayerDto {
    return {
      id: player.id,
      name: player.name,
      title: null,
      gender: "",
      level: 1,
      class: "No Class",
      mapId: player.mapId,
      x: player.x,
      y: player.y,
      isDefault: player.isDefault,
      stats: null,
      equipment: [],
      inventory: [],
      spells: [],
      skills: [],
      pets: [],
      messages: [],
      journal: [],
      achievements: [],
      quests: [],
    };
  }

  static toPlayerListDto(player: PlayerListItemDomain): PlayerListDto {
    return player;
  }
}
