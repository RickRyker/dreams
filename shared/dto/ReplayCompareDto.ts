// shared/dto/ReplayCompareDto.ts

import type {ReplaySummaryDto} from "./ReplaySummaryDto";

export interface ReplayCompareDto {
  combatA: ReplaySummaryDto;
  combatB: ReplaySummaryDto;
  diff: {
    dpsDelta: number;
    hpsDelta: number;
    durationDelta: number;
    deathDelta: number;
  };
}
