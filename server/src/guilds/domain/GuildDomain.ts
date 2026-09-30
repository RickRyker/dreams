// server/src/guilds/domain/GuildDomain.ts

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

export type CreateGuildCommand = CreateGuildRequestDto;
export type AddMemberCommand = AddMemberRequestDto;
export type PromoteMemberCommand = PromoteMemberRequestDto;
export type RemoveMemberCommand = RemoveMemberRequestDto;
export type DonateItemCommand = DonateItemRequestDto;
export type ReturnItemCommand = ReturnItemRequestDto;
export type BorrowItemCommand = BorrowItemRequestDto;
export type WithdrawItemCommand = WithdrawItemRequestDto;
export type LogGuildActionCommand = LogGuildActionRequestDto;
export type ListGuildLogsCommand = ListGuildLogsRequestDto;
