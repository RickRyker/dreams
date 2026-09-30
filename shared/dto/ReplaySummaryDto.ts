// shared/dto/ReplaySummaryDto.ts

import type {ReplayActorSummaryDto} from "./ReplayActorSummaryDto";

export interface ReplaySummaryDto {
  combatId: string;
  durationSeconds: number;
  rounds: number;
  turns: number;
  actors: ReplayActorSummaryDto[];
  killOrder: string[];
  causeOfDeath: Record<string, string | null>;
}
