// server/src/players/repositories/PlayerRepository.ts

import { prisma } from "../../db/client";
import { Player, Prisma, WorldConfigSettingType } from "@prisma/client";

type PlayerCreateExtras = Pick<
  Prisma.PlayerUncheckedCreateInput,
  | "mapId"
  | "x"
  | "y"
  | "hunger"
  | "hungerRate"
  | "fatigue"
  | "fatigueRate"
  | "thirst"
  | "thirstRate"
>;

export class PlayerRepository {

  async findMapIdBySlug(slug: string): Promise<string | null> {
    const map = await prisma.map.findFirst({
      where: {
        OR: [
          { id: slug },
          { name: slug },
        ],
      },
      select: { id: true },
    });
    return map?.id ?? null;
  }

  async findItemIdBySlug(slug: string): Promise<string | null> {
    const item = await prisma.item.findUnique({
      where: { slug },
      select: { id: true },
    });
    return item?.id ?? null;
  }

  async findSpellIdBySlug(slug: string): Promise<string | null> {
    const spell = await prisma.spell.findUnique({
      where: { slug },
      select: { id: true },
    });
    return spell?.id ?? null;
  }

  async findSkillIdBySlug(slug: string): Promise<string | null> {
    const skill = await prisma.skill.findUnique({
      where: { slug },
      select: { id: true },
    });
    return skill?.id ?? null;
  }

  async findClassIdByName(name: string): Promise<string | null> {
    const classRecord = await prisma.class.findUnique({
      where: { name },
      select: { id: true },
    });
    return classRecord?.id ?? null;
  }

  async findTutorialSpawn(): Promise<{ mapId: string; x: number; y: number } | null> {
    const settings = await prisma.worldConfigSetting.findMany({
      where: {
        name: {
          in: [
            WorldConfigSettingType.TUTORIAL_MAP,
            WorldConfigSettingType.TUTORIAL_START_X,
            WorldConfigSettingType.TUTORIAL_START_Y,
          ],
        },
      },
      select: { name: true, value: true },
    });

    const settingByName = new Map<WorldConfigSettingType, string>(
      settings.map((setting: { name: WorldConfigSettingType; value: string }) => [setting.name, setting.value]),
    );
    const mapRef = settingByName.get(WorldConfigSettingType.TUTORIAL_MAP)?.trim();
    if (!mapRef) {
      return null;
    }

    const map = await prisma.map.findFirst({
      where: {
        OR: [
          { id: mapRef },
          { name: mapRef },
        ],
      },
      select: { id: true },
    });
    if (!map) {
      return null;
    }

    const x = Number.parseInt(
      settingByName.get(WorldConfigSettingType.TUTORIAL_START_X) ?? "0",
      10,
    );
    const y = Number.parseInt(
      settingByName.get(WorldConfigSettingType.TUTORIAL_START_Y) ?? "0",
      10,
    );

    return {
      mapId: map.id,
      x: Number.isFinite(x) ? x : 0,
      y: Number.isFinite(y) ? y : 0,
    };
  }

  async addNameHistory(playerId: string, oldName: string, newName: string, moderatorId?: string) {
    return prisma.playerNameHistory.create({
      data: {
        playerId,
        oldName,
        newName,
        moderatorId: moderatorId ?? null,
      },
    });
  }

  async createPlayer(
    accountId: string,
    name?: string,
    extra: PlayerCreateExtras = {},
  ): Promise<Player> {
    return prisma.player.create({
      data: {
        accountId,
        name,
        isDefault: false,
        ...extra,
      },
    });
  }

  async findById(playerId: string) {
    return prisma.player.findUnique({ where: { id: playerId } });
  }

  async findFullPlayer(playerId: string) {
    return prisma.player.findUnique({
      where: { id: playerId },
      include: {
        stats: true,
        equipment: {
          include: {
            item: true,
          },
        },
        inventory: {
          include: {
            item: true,
          },
        },
        spells: true,
        skills: true,
        quests: true,
      },
    });
  }

  async assignClass(playerId: string, className: string) {
    const classRecord = await prisma.class.findUnique({
      where: { name: className }
    });

    if (!classRecord) {
      throw new Error(`Class not found: ${className}`);
    }

    return prisma.playerClass.upsert({
      where: {
        playerId_classId: {
          playerId,
          classId: classRecord.id
        }
      },
      update: {},
      create: {
        playerId,
        classId: classRecord.id,
        level: 1,
        experience: 0
      }
    });
  }

  async listPlayers(accountId: string) {
    return prisma.player.findMany({
      where: { accountId },
      orderBy: { createdAt: "asc" },
      include: {
        stats: true,
        classes: {
          include: {
            class: true,
          },
        },
      },
    });
  }

  async setDefaultPlayer(accountId: string, playerId: string): Promise<void> {
    await prisma.$transaction([
      prisma.player.updateMany({
        where: { accountId },
        data: { isDefault: false },
      }),
      prisma.player.update({
        where: { id: playerId },
        data: { isDefault: true },
      }),
    ]);
  }

  async update(
    id: string,
    data: Prisma.PlayerUpdateInput | Prisma.PlayerUncheckedUpdateInput,
  ): Promise<Player> {
    return prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(playerId: string) {
    return prisma.player.delete({
      where: { id: playerId }
    });
  }

  async createPlayerDeath(param: any) {
    prisma.playerDeath.create({
      data: {
        playerId: param.playerId,
        level: param.level,
        killedBy: param.killedBy,
        mapId: param.mapId,
        x: param.x,
        y: param.y,
      },
    });
  }

}
