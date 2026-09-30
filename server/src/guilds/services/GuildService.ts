// server/src/guilds/services/GuildService.ts


import { GuildRepository } from "../repositories/GuildRepository";
import { GuildMapper } from "../mappers/GuildMapper";
import { GuildAdapter } from "../adapters/GuildAdapter";
import { GuildLogActionType } from "shared/types/GuildLogActionEnum";
import {
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
import { ListGuildLogsRequestDto } from "../validators/GuildSchemas";

export class GuildService {
  constructor(private readonly repo: GuildRepository) {}

  private async log(dto: LogGuildActionCommand) {
    const input = GuildAdapter.toLogGuildActionPersistenceInput(dto);
    await this.repo.log(input);
  }

  // --- Guild core ---

  async createGuild(dto: CreateGuildCommand) {
    const input = GuildAdapter.toCreateGuildPersistenceInput(dto);
    const guild = await this.repo.createGuild(input);

    const gmRank = guild.ranks.find((r: any) => r.level === 9);
    if (!gmRank) throw new Error("Grand Master rank missing");

    await this.repo.addMember({
      guildId: guild.id,
      playerId: dto.founderId,
      rankId: gmRank.id,
    });

    const hydrated = await this.repo.getGuild(guild.id);
    return GuildMapper.toGuildWithRelationsDto(hydrated);
  }

  async getGuild(guildId: string) {
    const guild = await this.repo.getGuild(guildId);
    return guild ? GuildMapper.toGuildWithRelationsDto(guild) : null;
  }

  // --- Members ---

  async addMember(dto: AddMemberCommand) {
    const input = GuildAdapter.toAddMemberPersistenceInput(dto);
    await this.repo.addMember(input);

    await this.log({
      guildId: dto.guildId,
      playerId: dto.playerId,
      action: "JOINED",
      type: "MEMBERS",
      details: "Player joined guild",
    });
  }

  async promoteMember(dto: PromoteMemberCommand) {
    const input = GuildAdapter.toPromoteMemberPersistenceInput(dto);
    await this.repo.promoteMember(input.memberId, input.newRankId);

    await this.log({
      guildId: dto.guildId,
      playerId: dto.actorId,
      action: "PROMOTED",
      type: "MEMBERS",
      details: `Promoted member ${dto.memberId}`,
    });
  }

  async removeMember(dto: RemoveMemberCommand) {
    const { guildId, actorId, targetId } = GuildAdapter.toRemoveMemberPersistenceInput(dto);

    const guild = await this.repo.getGuild(guildId);
    if (!guild) throw new Error("Guild not found");

    const target = guild.members.find((m: any) => m.playerId === targetId);
    if (!target) throw new Error("Target not found");

    const actor = guild.members.find((m: any) => m.playerId === actorId);
    if (!actor) throw new Error("Actor not found");
    const isSelfLeave = actorId === targetId;

    if (!isSelfLeave) {
      const actorRank = guild.ranks.find((r: any) => r.id === actor.rankId);
      if (!actorRank) throw new Error("ActorRank not found");
      const canKick = actorRank.permissions.some(
        (p: any) => p.action === "KICK" && p.permitted
      );
      if (!canKick) throw new Error("No permission to kick");
    }

    const borrowed = await this.repo.findBorrowedItems(targetId, guildId);
    for (const item of borrowed) {
      await this.repo.giveItem(guildId, targetId, item.id);
      await this.log({
        guildId,
        playerId: targetId,
        action: "RETURNED",
        type: "TREASURY",
        details: `System returned ${item.item.name} on leave`,
      });
    }

    await this.repo.removeMember(guildId, targetId);

    const action: GuildLogActionType = isSelfLeave ? "LEFT_GUILD" : "KICKED";
    const details = isSelfLeave
      ? "Player left guild"
      : `Player was kicked by ${actorId}`;

    await this.log({
      guildId,
      playerId: targetId,
      action,
      type: "MEMBERS",
      details,
    });

    if (target.rankLevel === 9) {
      const remaining = guild.members.filter((m: any) => m.playerId !== targetId);
      if (remaining.length > 0) {
        const next = remaining.sort((a: any, b: any) => b.rankLevel - a.rankLevel)[0];
        const gmRank = guild.ranks.find((r: any) => r.level === 9);
        if (!gmRank) { throw new Error("No GM rank found."); }
        await this.repo.promoteMember(next.id, gmRank.id);
        await this.log({
          guildId,
          playerId: next.playerId,
          action: "PROMOTED",
          type: "MEMBERS",
          details: "System auto-promoted new Grand Master",
        });
      }
    }
  }

  // --- Treasury items ---

  async donateItem(dto: DonateItemCommand) {
    const input = GuildAdapter.toDonateItemPersistenceInput(dto);
    const item = await this.repo.getInventoryItemWithItem(input.itemId);
    if (!item) { throw new Error("Item not found"); }
    await this.repo.giveItem(input.guildId, input.playerId, input.itemId);

    await this.log({
      guildId: input.guildId,
      playerId: input.playerId,
      action: "DONATED",
      type: "TREASURY",
      details: `Donated ${item.item.name}`,
    });
  }

  async returnItem(dto: ReturnItemCommand) {
    const input = GuildAdapter.toReturnItemPersistenceInput(dto);
    const item = await this.repo.getInventoryItemWithItem(input.itemId);
    if (!item) { throw new Error("Item not found"); }
    await this.repo.giveItem(input.guildId, input.playerId, input.itemId);

    await this.log({
      guildId: input.guildId,
      playerId: input.playerId,
      action: "RETURNED",
      type: "TREASURY",
      details: `Returned ${item.item.name}`,
    });
  }

  async borrowItem(dto: BorrowItemCommand) {
    const input = GuildAdapter.toBorrowItemPersistenceInput(dto);
    const item = await this.repo.getInventoryItemWithItem(input.itemId);
    if (!item) { throw new Error("Item not found"); }
    await this.repo.takeItem(input.guildId, input.playerId, input.itemId);

    await this.log({
      guildId: input.guildId,
      playerId: input.playerId,
      action: "BORROWED",
      type: "TREASURY",
      details: `Borrowed ${item.item.name}`,
    });
  }

  async withdrawItem(dto: WithdrawItemCommand) {
    const input = GuildAdapter.toWithdrawItemPersistenceInput(dto);
    const item = await this.repo.getInventoryItemWithItem(input.itemId);
    if (!item) { throw new Error("Item not found"); }
    await this.repo.takeItem(input.guildId, input.playerId, input.itemId);

    await this.log({
      guildId: input.guildId,
      playerId: input.playerId,
      action: "WITHDREW",
      type: "TREASURY",
      details: `Withdrew ${item.item.name}`,
    });
  }

  async listBorrowedItems(guildId: string, playerId: string) {
    return this.repo.findBorrowedItems(playerId, guildId);
  }

  async listTreasuryItems(guildId: string) {
    return this.repo.listItems(guildId);
  }

  // --- Logs ---

  async listLogs(dto: ListGuildLogsCommand) {
    const guild = await this.repo.getGuild(dto.guildId);
    if (!guild) { throw new Error("Guild not found"); }
    return guild.logs;
  }
}
