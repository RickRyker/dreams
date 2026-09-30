// server/src/modules/titles/titles.controller.ts

import {
  listTitles,
  listPlayerTitles,
  equipTitle,
  unequipTitle
} from './titles.service.js';

export const listTitlesController = async () => listTitles();

export const listPlayerTitlesController = async (playerId: string) =>
  listPlayerTitles(playerId);

export const equipTitleController = async (playerId: string, titleId: string) =>
  equipTitle(playerId, titleId);

export const unequipTitleController = async (playerId: string) =>
  unequipTitle(playerId);
