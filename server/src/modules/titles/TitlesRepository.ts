// server/src/modules/titles/TitlesRepository.ts

import { Prisma } from '@prisma/client';
import { prisma } from "@prisma";
import { TitleDTO, PlayerTitleDTO } from './types.js';

export class TitlesRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listAllTitles(tx?: Prisma.TransactionClient): Promise<TitleDTO[]> {
    const client = tx || prisma;
    return client.title.findMany() as Promise<TitleDTO[]>;
  }

  async getTitleById(titleId: string, tx?: Prisma.TransactionClient): Promise<TitleDTO | null> {
    const client = tx || prisma;
    return client.title.findUnique({
      where: { id: titleId }
    }) as Promise<TitleDTO | null>;
  }

  async listPlayerTitles(playerId: string, tx?: Prisma.TransactionClient): Promise<PlayerTitleDTO[]> {
    const client = tx || prisma;
    const titles = await client.playerTitle.findMany({
      where: { playerId },
      include: { title: true }
    });

    return titles.map((playerTitle) => ({
      id: playerTitle.id,
      playerId: playerTitle.playerId,
      titleId: playerTitle.titleId,
      awardedAt: playerTitle.awardedAt,
      title: {
        id: playerTitle.title.id,
        name: playerTitle.title.name,
        description: playerTitle.title.description,
        rarity: playerTitle.title.display,
      }
    }));
  }

  async getPlayerTitle(
    playerId: string,
    titleId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerTitleDTO | null> {
    const client = tx || prisma;
    const playerTitle = await client.playerTitle.findFirst({
      where: { playerId, titleId },
      include: { title: true }
    });

    if (!playerTitle) return null;

    return {
      id: playerTitle.id,
      playerId: playerTitle.playerId,
      titleId: playerTitle.titleId,
      awardedAt: playerTitle.awardedAt,
      title: {
        id: playerTitle.title.id,
        name: playerTitle.title.name,
        description: playerTitle.title.description,
        rarity: playerTitle.title.display,
      }
    };
  }

  async awardTitleToPlayer(
    playerId: string,
    titleId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerTitleDTO> {
    const client = tx || prisma;
    const playerTitle = await client.playerTitle.create({
      data: {
        playerId,
        titleId,
        awardedAt: new Date()
      },
      include: { title: true }
    });

    return {
      id: playerTitle.id,
      playerId: playerTitle.playerId,
      titleId: playerTitle.titleId,
      awardedAt: playerTitle.awardedAt,
      title: {
        id: playerTitle.title.id,
        name: playerTitle.title.name,
        description: playerTitle.title.description,
        rarity: playerTitle.title.display,
      }
    };
  }

  async equipTitle(
    playerId: string,
    titleId: string,
    tx?: Prisma.TransactionClient
  ): Promise<any> {
    const client = tx || prisma;

    const playerTitle = await client.playerTitle.findFirst({
      where: { playerId, titleId },
      include: { title: true }
    });

    if (!playerTitle) {
      throw new Error('PlayerTitleNotFound');
    }

    return client.player.update({
      where: { id: playerId },
      data: { title: playerTitle.title.name }
    });
  }

  async unequipTitle(playerId: string, tx?: Prisma.TransactionClient): Promise<any> {
    const client = tx || prisma;
    return client.player.update({
      where: { id: playerId },
      data: { title: '' }
    });
  }

  async getPlayerCurrentTitle(playerId: string, tx?: Prisma.TransactionClient): Promise<string | null> {
    const client = tx || prisma;
    const player = await client.player.findUnique({
      where: { id: playerId },
      select: { title: true }
    });
    return player?.title || null;
  }
}
