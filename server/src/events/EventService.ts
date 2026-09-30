// server/src/events/EventService.ts

import { EventRepository } from './EventRepository';
import { EventType, RewardType } from '@prisma/client';

export class EventService {
  constructor(private repo: EventRepository) {}

  list() { return this.repo.list(); }
  get(slug: string) { return this.repo.get(slug); }

  async create(input: {
    slug: string;
    name: string;
    description: string;
    type: EventType;
    isHoliday: boolean;
    startsAt: string;
    endsAt: string;
    createdById: string;
  }) {
    return this.repo.create({
      slug: input.slug,
      name: input.name,
      description: input.description,
      type: input.type,
      isHoliday: input.isHoliday,
      startsAt: new Date(input.startsAt),
      endsAt: new Date(input.endsAt),
      isActive: false,
      createdBy: { connect: { id: input.createdById } },
    });
  }

  async update(slug: string, patch: any) {
    const data: any = {};
    if (patch.name !== undefined) data.name = patch.name;
    if (patch.description !== undefined) data.description = patch.description;
    if (patch.type !== undefined) data.type = patch.type;
    if (patch.isHoliday !== undefined) data.isHoliday = patch.isHoliday;
    if (patch.startsAt !== undefined) data.startsAt = new Date(patch.startsAt);
    if (patch.endsAt !== undefined) data.endsAt = new Date(patch.endsAt);
    if (patch.isActive !== undefined) data.isActive = patch.isActive;

    return this.repo.update(slug, data);
  }

  async addReward(slug: string, reward: {
    rewardType: RewardType;
    title?: string;
    itemId?: string;
    recipeId?: string;
    amount?: number;
    value?: number;
  }) {
    const event = await this.repo.get(slug);
    if (!event) throw new Error('Event not found');

    return this.repo.addReward(event.id, {
      rewardType: reward.rewardType,
      title: reward.title ?? null,
      item: reward.itemId ? { connect: { id: reward.itemId } } : undefined,
      recipe: reward.recipeId ? { connect: { id: reward.recipeId } } : undefined,
      amount: reward.amount ?? null,
      value: reward.value ?? null,
      event: { connect: { id: event.id } },
    } as any);
  }

  deleteReward(id: string) {
    return this.repo.deleteReward(id);
  }
}
