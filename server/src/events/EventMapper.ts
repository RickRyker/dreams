// server/src/events/EventMapper.ts

import { Event, EventReward } from '@prisma/client';
import { EventDTO, EventRewardDTO } from './EventDto';

export function toEventDTO(event: Event & { rewards: EventReward[] }): EventDTO {
  return {
    slug: event.slug,
    name: event.name,
    description: event.description,
    isActive: event.isActive,
    startsAt: event.startsAt.toISOString(),
    endsAt: event.endsAt.toISOString(),
    rewards: event.rewards.map(toEventRewardDTO),
  };
}

export function toEventRewardDTO(r: EventReward): EventRewardDTO {
  return {
    id: r.id,
    rewardType: r.rewardType,
    title: r.title,
    itemId: r.itemId,
    recipeId: r.recipeId,
    amount: r.amount,
    value: r.value,
  };
}
