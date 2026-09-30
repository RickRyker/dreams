// client/src/hooks/useTelegraphs.ts

import {useMemo} from "react";
import type {CombatTimelineEventDto} from "shared";

export function useTelegraphs(events: CombatTimelineEventDto[], now: number) {
  return useMemo(() => {
    return events.filter(e => {
      if (!e.telegraph) return false;
      if (e.type !== "TELEGRAPH_START") return false;

      const end = events.find(
        x => x.type === "TELEGRAPH_END" &&
          x.label === e.label &&
          x.participantId === e.participantId
      );

      return end ? now >= e.timestamp && now < end.timestamp : false;
    });
  }, [events, now]);
}
