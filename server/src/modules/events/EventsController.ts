// server/src/modules/events/EventsController.ts

import type { Request, Response } from 'express';
import { AppError } from '../../errors/AppError.js';
import { EventsService } from './EventsService.js';
import { CreateEventRequest, UpdateEventRequest, JoinEventRequest } from './types.js';

export class EventsController {
  constructor(private service: EventsService) {}

  private readParam(params: Request["params"], name: string) {
    const value = params[name];
    if (Array.isArray(value)) return value[0];
    return value ?? "";
  }

  async listEvents(req: Request, res: Response) {
    try {
      const events = await this.service.listAllEvents();
      return res.json(events);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async listActiveEvents(req: Request, res: Response) {
    try {
      const events = await this.service.listActiveEvents();
      return res.json(events);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const gmId = req.auth?.accountId;
      if (!gmId) return res.status(401).json({ error: 'Unauthorized' });

      const body = req.body as CreateEventRequest;
      const event = await this.service.createEvent(gmId, body);
      return res.status(201).json(event);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const eventId = this.readParam(req.params, 'eventId');
      const body = req.body as UpdateEventRequest;
      const event = await this.service.updateEvent(eventId, body);
      return res.json(event);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async joinEvent(req: Request, res: Response) {
    try {
      const playerId = this.readParam(req.params, 'playerId') || ((req.body as { playerId?: string } | undefined)?.playerId ?? "");
      if (!playerId) return res.status(400).json({ error: 'BAD REQUEST' });
      const body = req.body as JoinEventRequest;
      const participation = await this.service.joinEvent(playerId, body.eventId);
      return res.status(201).json(participation);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getParticipation(req: Request, res: Response) {
    try {
      const playerId = this.readParam(req.params, 'playerId');
      if (!playerId) return res.status(400).json({ error: 'BAD REQUEST' });
      const eventId = this.readParam(req.params, 'eventId');
      const participation = await this.service.getEventParticipation(playerId, eventId);
      return res.json(participation);
    } catch (error) {
      if (error instanceof AppError) return res.status(error.statusCode).json({ error: error.message });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
