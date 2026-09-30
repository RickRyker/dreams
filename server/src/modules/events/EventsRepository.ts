// server/src/modules/events/EventsRepository.ts

import { Event, EventParticipation, EventType, Prisma } from '@prisma/client';
import { prisma } from "@prisma";

export class EventsRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listAllEvents(tx?: Prisma.TransactionClient): Promise<Event[]> {
    const client = tx || prisma;
    return client.event.findMany();
  }

  async listActiveEvents(tx?: Prisma.TransactionClient): Promise<Event[]> {
    const client = tx || prisma;
    const now = new Date();
    return client.event.findMany({
      where: {
        isActive: true,
        startsAt: { lte: now },
        endsAt: { gte: now }
      }
    });
  }

  async getEventById(eventId: string, tx?: Prisma.TransactionClient): Promise<Event | null> {
    const client = tx || prisma;
    return client.event.findUnique({ where: { id: eventId } });
  }

  async createEvent(data: {
    slug: string;
    name: string;
    description?: string;
    type: EventType;
    isHoliday?: boolean;
    startsAt: Date;
    endsAt: Date;
    createdById: string;
  }, tx?: Prisma.TransactionClient): Promise<Event> {
    const client = tx || prisma;
    return client.event.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description ?? '',
        type: data.type,
        isHoliday: data.isHoliday || false,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        createdById: data.createdById,
      isActive: true
    }
    });
  }

  async updateEvent(eventId: string, data: {
    name?: string;
    description?: string;
    isActive?: boolean;
    startsAt?: Date;
    endsAt?: Date;
  }, tx?: Prisma.TransactionClient): Promise<Event> {
    const client = tx || prisma;
    return client.event.update({
    where: { id: eventId },
    data: {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      startsAt: data.startsAt,
      endsAt: data.endsAt
    }
  });
  }

  async joinEvent(playerId: string, eventId: string, tx?: Prisma.TransactionClient): Promise<EventParticipation> {
    const client = tx || prisma;
    return client.eventParticipation.upsert({
      where: {
        eventId_playerId: { eventId, playerId }
      },
      update: {},
      create: {
        eventId,
        playerId,
        completed: false,
        rewardClaimed: false,
        progress: {}
      }
    });
  }

  async getEventParticipation(playerId: string, eventId: string, tx?: Prisma.TransactionClient): Promise<EventParticipation | null> {
    const client = tx || prisma;
    return client.eventParticipation.findUnique({
      where: {
        eventId_playerId: { eventId, playerId }
      }
    });
  }
}
