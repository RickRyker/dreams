// server/src/modules/events/EventsMapper.ts

import type { Event, EventParticipation } from "@prisma/client";
import type { EventDTO, EventParticipationDTO } from "./types";

export class EventsMapper {
  toEventDto(model: Event): EventDTO {
    return {
      id: model.id,
      slug: model.slug,
      name: model.name,
      description: model.description,
      type: model.type,
      isActive: model.isActive,
      isHoliday: model.isHoliday,
      startsAt: model.startsAt,
      endsAt: model.endsAt,
    };
  }

  toEventParticipationDto(model: EventParticipation): EventParticipationDTO {
    return {
      id: model.id,
      playerId: model.playerId,
      eventId: model.eventId,
      completed: model.completed,
      rewardClaimed: model.rewardClaimed,
      progress: model.progress,
    };
  }
}
