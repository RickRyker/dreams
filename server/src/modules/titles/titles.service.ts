// server/src/modules/titles/titles.service.ts

import { prisma } from "@prisma";
import { AppError } from '../../errors/AppError.js';

export const listTitles = async () => prisma.title.findMany();

export const listPlayerTitles = async (playerId: string) =>
  prisma.playerTitle.findMany({
    where: { playerId },
    include: { title: true }
  });

export const equipTitle = async (playerId: string, titleId: string) => {
  const owned = await prisma.playerTitle.findFirst({
    where: { playerId, titleId }
  });

  if (!owned) throw new AppError('Player does not own this title', 403);

  const title = await prisma.title.findUnique({
    where: { id: titleId }
  });

  return prisma.player.update({
    where: { id: playerId },
    data: { title: title?.name ?? '' }
  });
};

export const unequipTitle = async (playerId: string) =>
  prisma.player.update({
    where: { id: playerId },
    data: { title: '' }
  });
