// server/src/guilds/repositories/GuildRepository.ts


import {prisma} from "@prisma";
import {GuildLogActionType, GuildLogType,} from "@prisma/client";
import {buildDefaultGuildRankCreateInput} from "../helpers/GuildRankDefaults";
import {getItemContainerType} from "../helpers/ItemLocationHelper";

export class GuildRepository {
  // -------------------------------------------------------
  // Guild creation
  // -------------------------------------------------------

  async createGuild(input: any) {
    return prisma.guild.create({
      data: {
        name: input.name,
        description: input.description,
        founderId: input.founderId,
        ranks: { create: buildDefaultGuildRankCreateInput() },
      },
      include: {
        members: {
          include: {
            player: true,
            rank: { include: { permissions: true } },
          },
        },
        ranks: { include: { permissions: true } },
        logs: true,
        treasury: true,
      },
    });
  }

  async getGuild(guildId: string) {
    return prisma.guild.findUnique({
      where: { id: guildId },
      include: {
        members: {
          include: {
            player: true,
            rank: { include: { permissions: true } },
          },
        },
        ranks: { include: { permissions: true } },
        logs: true,
        treasury: true,
      },
    });
  }

  // -------------------------------------------------------
  // Members
  // -------------------------------------------------------

  async addMember(input: any) {
    return prisma.guildMember.create({ data: input });
  }

  async promoteMember(memberId: string, newRankId: string) {
    return prisma.guildMember.update({
      where: { id: memberId },
      data: { rankId: newRankId },
    });
  }

  async removeMember(guildId: string, playerId: string) {
    return prisma.guildMember.delete({
      where: { guildId_playerId: { guildId, playerId } },
    });
  }

  // -------------------------------------------------------
  // Logging
  // -------------------------------------------------------

  async log(input: any) {
    return prisma.guildLog.create({
      data: {
        guildId: input.guildId,
        playerId: input.playerId,
        action: input.action as GuildLogActionType,
        type: input.type as GuildLogType,
        details: input.details,
      },
    });
  }

  // -------------------------------------------------------
  // Items
  // -------------------------------------------------------

  async getInventoryItemWithItem(itemId: string) {
    return prisma.inventoryItem.findUnique({
      where: { id: itemId },
      include: { item: true },
    });
  }

  async giveItem(guildId: string, playerId: string, itemId: string) {
    const item = await this.getInventoryItemWithItem(itemId);
    if (!item) throw new Error("Item not found");

    const location = getItemContainerType(item);
    const isBorrowed =
      item.guildTagId === guildId && item.playerId === playerId;

    // DONATE
    if (location === "PLAYER" && !isBorrowed) {
      return prisma.inventoryItem.update({
        where: { id: itemId },
        data: {
          playerId: null,
          guildTagId: guildId,
          containerId: null,
          containerType: "GUILD",
        },
      });
    }

    // RETURN
    return prisma.inventoryItem.update({
      where: { id: itemId },
      data: {
        playerId: null,
        guildTagId: guildId,
        containerId: null,
        containerType: "GUILD",
      },
    });
  }

  async takeItem(guildId: string, playerId: string, itemId: string) {
    const item = await this.getInventoryItemWithItem(itemId);
    if (!item) throw new Error("Item not found");

    const location = getItemContainerType(item);
    const isTagged = item.guildTagId === guildId;

    // BORROW
    if (location === "GUILD" && isTagged) {
      return prisma.inventoryItem.update({
        where: { id: itemId },
        data: {
          playerId,
          guildTagId: guildId,
          containerId: null,
          containerType: "PLAYER",
        },
      });
    }

    // WITHDRAW
    if (location === "GUILD") {
      return prisma.inventoryItem.update({
        where: { id: itemId },
        data: {
          playerId,
          guildTagId: null,
          containerId: null,
          containerType: "PLAYER",
        },
      });
    }

    throw new Error("Item is not in guild treasury");
  }

  async findBorrowedItems(playerId: string, guildId: string) {
    return prisma.inventoryItem.findMany({
      where: { playerId, guildTagId: guildId },
      include: { item: true },
    });
  }

  async listItems(guildId: string) {
    return prisma.inventoryItem.findMany({
      where: {
        guildTagId: guildId,
        playerId: null,
        containerType: "GUILD",
      },
      include: { item: true },
    });
  }
}
