// server/src/modules/events/EventsService.ts

import { AppError } from '../../errors/AppError.js';
import { EventsRepository } from './EventsRepository.js';
import { EventsMapper } from './EventsMapper.js';
import { EventDTO, EventParticipationDTO, CreateEventRequest, UpdateEventRequest } from './types.js';

export class EventsService {
  constructor(
    private repo: EventsRepository,
    private mapper: EventsMapper,
  ) {}

  async listAllEvents(): Promise<EventDTO[]> {
    try {
      return (await this.repo.listAllEvents()).map((event) => this.mapper.toEventDto(event));
    } catch (error) {
      throw new AppError('Failed to list events', 500);
    }
  }

  async listActiveEvents(): Promise<EventDTO[]> {
    try {
      return (await this.repo.listActiveEvents()).map((event) => this.mapper.toEventDto(event));
    } catch (error) {
      throw new AppError('Failed to list active events', 500);
    }
  }

  async createEvent(gmId: string, data: CreateEventRequest): Promise<EventDTO> {
    if (!gmId) throw new AppError('GM ID is required', 400);
    if (!data.slug || !data.name) throw new AppError('slug and name are required', 400);

    try {
      return await this.repo.createEvent({
        slug: data.slug,
        name: data.name,
        description: data.description,
        type: data.type,
        isHoliday: data.isHoliday,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        createdById: gmId
      }).then((event) => this.mapper.toEventDto(event));
    } catch (error) {
      throw new AppError('Failed to create event', 500);
    }
  }

  async updateEvent(eventId: string, data: UpdateEventRequest): Promise<EventDTO> {
    if (!eventId) throw new AppError('Event ID is required', 400);

    const event = await this.repo.getEventById(eventId);
    if (!event) throw new AppError('Event not found', 404);

    try {
      return this.mapper.toEventDto(await this.repo.updateEvent(eventId, data));
    } catch (error) {
      throw new AppError('Failed to update event', 500);
    }
  }

  async joinEvent(playerId: string, eventId: string): Promise<EventParticipationDTO> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!eventId) throw new AppError('Event ID is required', 400);

    const event = await this.repo.getEventById(eventId);
    if (!event) throw new AppError('Event not found', 404);

    try {
      return this.mapper.toEventParticipationDto(await this.repo.joinEvent(playerId, eventId));
    } catch (error: any) {
      if (error.code === 'P2025') throw new AppError('Player or event not found', 404);
      throw new AppError('Failed to join event', 500);
    }
  }

  async getEventParticipation(playerId: string, eventId: string): Promise<EventParticipationDTO | null> {
    if (!playerId) throw new AppError('Player ID is required', 400);
    if (!eventId) throw new AppError('Event ID is required', 400);

    try {
      const participation = await this.repo.getEventParticipation(playerId, eventId);
      return participation ? this.mapper.toEventParticipationDto(participation) : null;
    } catch (error) {
      throw new AppError('Failed to get participation', 500);
    }
  }
}
