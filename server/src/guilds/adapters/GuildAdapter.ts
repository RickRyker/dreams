// server/src/guilds/adapters/GuildAdapter.ts

import {
  CreateGuildRequestDto,
  AddMemberRequestDto,
  PromoteMemberRequestDto,
  RemoveMemberRequestDto,
  DonateItemRequestDto,
  ReturnItemRequestDto,
  BorrowItemRequestDto,
  WithdrawItemRequestDto,
  LogGuildActionRequestDto,
} from "../validators/GuildSchemas";

export class GuildAdapter {
  static toCreateGuildPersistenceInput(dto: CreateGuildRequestDto) {
    return {
      name: dto.name,
      description: dto.description,
      founderId: dto.founderId,
    };
  }

  static toAddMemberPersistenceInput(dto: AddMemberRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      rankId: dto.rankId,
    };
  }

  static toPromoteMemberPersistenceInput(dto: PromoteMemberRequestDto) {
    return {
      guildId: dto.guildId,
      memberId: dto.memberId,
      newRankId: dto.newRankId,
      actorId: dto.actorId,
    };
  }

  static toRemoveMemberPersistenceInput(dto: RemoveMemberRequestDto) {
    return {
      guildId: dto.guildId,
      actorId: dto.actorId,
      targetId: dto.targetId,
    };
  }

  static toDonateItemPersistenceInput(dto: DonateItemRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      itemId: dto.itemId,
    };
  }

  static toReturnItemPersistenceInput(dto: ReturnItemRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      itemId: dto.itemId,
    };
  }

  static toBorrowItemPersistenceInput(dto: BorrowItemRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      itemId: dto.itemId,
    };
  }

  static toWithdrawItemPersistenceInput(dto: WithdrawItemRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      itemId: dto.itemId,
    };
  }

  static toLogGuildActionPersistenceInput(dto: LogGuildActionRequestDto) {
    return {
      guildId: dto.guildId,
      playerId: dto.playerId,
      action: dto.action,
      type: dto.type,
      details: dto.details,
    };
  }
}
