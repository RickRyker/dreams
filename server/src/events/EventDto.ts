// server/src/events/EventDto.ts

import { RewardType } from '@prisma/client';

export interface EventDTO {
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  rewards: EventRewardDTO[];
}

export interface EventRewardDTO {
  id: string;
  rewardType: RewardType;
  title?: string | null;
  itemId?: string | null;
  recipeId?: string | null;
  amount?: number | null;
  value?: number | null;
}
