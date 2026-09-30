// server/src/modules/titles/types.ts

import { Title, PlayerTitle } from '@prisma/client';

export interface TitleDTO {
  id: string;
  name: string;
  description?: string | null;
  rarity?: string | null;
}

export interface PlayerTitleDTO {
  id: string;
  playerId: string;
  titleId: string;
  awardedAt: Date;
  title: TitleDTO;
}

export interface EquipTitleRequest {
  titleId: string;
}
