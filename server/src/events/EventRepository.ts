// server/src/events/EventRepository.ts

import {prisma} from "@prisma";
import {Prisma} from '@prisma/client';

export class EventRepository {
  async list() {
    return prisma.event.findMany({
      include: { rewards: true },
      orderBy: { startsAt: 'asc' },
    });
  }

  async get(slug: string) {
    return prisma.event.findUnique({
      where: { slug },
      include: { rewards: true },
    });
  }

  async create(data: Prisma.EventCreateInput) {
    return prisma.event.create({ data });
  }

  async update(slug: string, data: Prisma.EventUpdateInput) {
    return prisma.event.update({ where: { slug }, data });
  }

  async addReward(eventId: string, data: Prisma.EventRewardCreateInput) {
    return prisma.eventReward.create({ data: { ...data, event: { connect: { id: eventId } } } });
  }

  async deleteReward(id: string) {
    return prisma.eventReward.delete({ where: { id } });
  }
}
