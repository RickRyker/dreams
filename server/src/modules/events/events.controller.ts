// server/src/modules/events/events.controller.ts

import { Request, Response } from 'express';
import { EventsService } from './events.service';
import { createEventSchema, updateEventSchema, eventParticipationSchema } from './events.schema';

export class EventsController {
  constructor(private service: EventsService) {}

  private getPlayerId(req: Request): string | null {
    const paramPlayerId = Array.isArray(req.params.playerId) ? req.params.playerId[0] : req.params.playerId;
    if (paramPlayerId) return paramPlayerId;

    const body = req.body as { playerId?: unknown } | undefined;
    return typeof body?.playerId === "string" ? body.playerId : null;
  }

  createEvent = async (req: Request, res: Response) => {
    const gmId = this.getPlayerId(req);
    if (!gmId) return res.status(400).json({ error: "BAD REQUEST" });
    const parsed = createEventSchema.parse(req.body);
    const event = await this.service.createEvent(gmId, {
      ...parsed,
      type: parsed.type as any,
      startsAt: new Date(parsed.startsAt),
      endsAt: new Date(parsed.endsAt)
    });
    res.status(201).json(event);
  };

  listActive = async (_req: Request, res: Response) => {
    const events = await this.service.listActiveEvents();
    res.json(events);
  };

  listAll = async (_req: Request, res: Response) => {
    const events = await this.service.listAllEvents();
    res.json(events);
  };

  updateEvent = async (req: Request, res: Response) => {
    const parsed = updateEventSchema.parse(req.body);
    const event = await this.service.updateEvent({
      ...parsed,
      startsAt: parsed.startsAt ? new Date(parsed.startsAt) : undefined,
      endsAt: parsed.endsAt ? new Date(parsed.endsAt) : undefined
    });
    res.json(event);
  };

  joinEvent = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const { eventId } = eventParticipationSchema.parse(req.body);
    const participation = await this.service.joinEvent(playerId, eventId);
    res.status(201).json(participation);
  };

  getParticipation = async (req: Request, res: Response) => {
    const playerId = this.getPlayerId(req);
    if (!playerId) return res.status(400).json({ error: "BAD REQUEST" });
    const eventId = Array.isArray(req.params.eventId) ? req.params.eventId[0] : req.params.eventId;
    const participation = await this.service.getEventParticipation(playerId, eventId);
    res.json(participation);
  };
}
