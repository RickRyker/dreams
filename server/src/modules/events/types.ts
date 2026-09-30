// server/src/modules/events/types.ts

import { Event, EventParticipation, EventType } from '@prisma/client';

export interface EventDTO {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  type: EventType;
  isActive: boolean;
  isHoliday: boolean;
  startsAt: Date;
  endsAt: Date;
}

export interface EventParticipationDTO {
  id: string;
  playerId: string;
  eventId: string;
  completed: boolean;
  rewardClaimed: boolean;
  progress?: any;
}

export interface CreateEventRequest {
  slug: string;
  name: string;
  description?: string;
  type: EventType;
  isHoliday?: boolean;
  startsAt: Date;
  endsAt: Date;
}

export interface UpdateEventRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
  startsAt?: Date;
  endsAt?: Date;
}

export interface JoinEventRequest {
  eventId: string;
}
