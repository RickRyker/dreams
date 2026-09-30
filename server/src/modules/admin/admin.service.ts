// server/src/modules/admin/admin.service.ts

import { PrismaClient } from '@prisma/client';

export class AdminService {
  constructor(private prisma: PrismaClient) {}

  async banPlayer(gmId: string, playerId: string, reason: string, durationMs?: number) {
    const expiresAt = durationMs ? new Date(Date.now() + durationMs) : null;

    await this.prisma.ban.create({
      data: { playerId, reason, expiresAt, createdById: gmId }
    });

    await this.prisma.account.update({
      where: { id: playerId },
      data: { isBanned: true }
    });
  }

  async unbanPlayer(playerId: string) {
    await this.prisma.account.update({
      where: { id: playerId },
      data: { isBanned: false }
    });
  }

  async mutePlayer(gmId: string, playerId: string, reason: string, durationMs?: number) {
    const expiresAt = durationMs ? new Date(Date.now() + durationMs) : null;

    await this.prisma.mute.create({
      data: { playerId, reason, expiresAt, createdById: gmId }
    });
  }

  async unmutePlayer(playerId: string) {
    // You may want to expire active mutes; this is enough for now.
    return;
  }

  async teleportPlayer(playerId: string, mapId: string, x: number, y: number) {
    await this.prisma.player.update({
      where: { id: playerId },
      data: { mapId, x, y }
    });
  }

  async spawnMonster(monsterTypeId: string, mapId: string, x: number, y: number, count: number) {
    // This is world-server logic; DB logging optional.
    return;
  }

  async spawnItem(itemTypeId: string, mapId: string, x: number, y: number) {
    // Same as above.
    return;
  }

  async setStat(playerId: string, stat: string, value: number) {
    // You may have a PlayerStats table; placeholder.
    return;
  }

  async addExp(playerId: string, amount: number) {
    await this.prisma.playerStats.update({
      where: { playerId },
      data: { experience: { increment: amount } }
    });
  }

  async setLevel(playerId: string, level: number) {
    await this.prisma.playerStats.update({
      where: { playerId },
      data: { level }
    });
  }

  async toggleInvisibility(playerId: string, invisible: boolean) {
    await this.prisma.player.update({
      where: { id: playerId },
      data: { isInvisible: invisible }
    });
  }

  async killPlayer(playerId: string) {
    // Signal to combat server; placeholder.
    return;
  }

  async respawnPlayer(playerId: string) {
    // Respawn logic; placeholder.
    return;
  }
}
