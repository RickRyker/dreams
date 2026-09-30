// server/src/modules/events/events.service.ts

import { PrismaClient, EventType } from '@prisma/client';

export class EventsService {
  constructor(private prisma: PrismaClient) {}

  createEvent(gmId: string, data: {
    slug: string;
    name: string;
    description?: string;
    type: EventType;
    isHoliday?: boolean;
    startsAt: Date;
    endsAt: Date;
  }) {
    return this.prisma.event.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description ?? '',
        type: data.type,
        isHoliday: data.isHoliday ?? false,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        createdById: gmId
      }
    });
  }

  listActiveEvents() {
    const now = new Date();
    return this.prisma.event.findMany({
      where: {
        isActive: true,
        startsAt: { lte: now },
        endsAt: { gte: now }
      }
    });
  }

  listAllEvents() {
    return this.prisma.event.findMany();
  }

  updateEvent(data: {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    startsAt?: Date;
    endsAt?: Date;
  }) {
    return this.prisma.event.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        startsAt: data.startsAt,
        endsAt: data.endsAt
      }
    });
  }

  async joinEvent(playerId: string, eventId: string) {
    return this.prisma.eventParticipation.upsert({
      where: { eventId_playerId: { eventId, playerId } },
      update: {},
      create: {
        eventId,
        playerId,
        progress: {},
        completed: false,
        rewardClaimed: false
      }
    });
  }

  getEventParticipation(playerId: string, eventId: string) {
    return this.prisma.eventParticipation.findUnique({
      where: { eventId_playerId: { eventId, playerId } }
    });
  }
}
