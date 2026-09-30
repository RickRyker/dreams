// shared/dto/ReplayTimelineDto.ts

import type {ReplayEventDto} from "./ReplayEventDto";

export interface ReplayTimelineDto {
  combatId: string;
  events: ReplayEventDto[];
}
