// server/src/guilds/assemblers/GuildAssembler.ts

import type {
  CreateGuildRequestDto,
  AddMemberRequestDto,
  PromoteMemberRequestDto,
  RemoveMemberRequestDto,
  DonateItemRequestDto,
  ReturnItemRequestDto,
  BorrowItemRequestDto,
  WithdrawItemRequestDto,
  LogGuildActionRequestDto,
  ListGuildLogsRequestDto,
} from "../validators/GuildSchemas";
import type {
  AddMemberCommand,
  BorrowItemCommand,
  CreateGuildCommand,
  DonateItemCommand,
  LogGuildActionCommand,
  ListGuildLogsCommand,
  PromoteMemberCommand,
  RemoveMemberCommand,
  ReturnItemCommand,
  WithdrawItemCommand,
} from "../domain/GuildDomain";
import { GuildMapper, GuildWithRelationsDto } from "../mappers/GuildMapper";

export class GuildAssembler {
  static toCreateGuildCommand(dto: CreateGuildRequestDto): CreateGuildCommand {
    return dto;
  }

  static toAddMemberCommand(dto: AddMemberRequestDto): AddMemberCommand {
    return dto;
  }

  static toPromoteMemberCommand(dto: PromoteMemberRequestDto): PromoteMemberCommand {
    return dto;
  }

  static toRemoveMemberCommand(dto: RemoveMemberRequestDto): RemoveMemberCommand {
    return dto;
  }

  static toDonateItemCommand(dto: DonateItemRequestDto): DonateItemCommand {
    return dto;
  }

  static toReturnItemCommand(dto: ReturnItemRequestDto): ReturnItemCommand {
    return dto;
  }

  static toBorrowItemCommand(dto: BorrowItemRequestDto): BorrowItemCommand {
    return dto;
  }

  static toWithdrawItemCommand(dto: WithdrawItemRequestDto): WithdrawItemCommand {
    return dto;
  }

  static toLogGuildActionCommand(dto: LogGuildActionRequestDto): LogGuildActionCommand {
    return dto;
  }

  static toListGuildLogsCommand(dto: ListGuildLogsRequestDto): ListGuildLogsCommand {
    return dto;
  }

  static toGuildDto(model: any): GuildWithRelationsDto {
    return GuildMapper.toGuildWithRelationsDto(model);
  }
}
