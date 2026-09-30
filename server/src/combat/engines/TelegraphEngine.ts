// server/src/combat/engines/TelegraphEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { EngineCombatEvent, TelegraphStartEvent, TelegraphEndEvent} from "../types/EngineCombatTypes";
import { CombatTimeline } from "../CombatTimeline";

interface ActiveTelegraph {
  id: string;
  sourceId: string;
  abilityId: string;
  x: number;
  y: number;
  telegraph: TelegraphStartEvent["telegraph"];
  startedAt: number;
  endsAt: number;
}

export class TelegraphEngine {
  private active = new Map<string, ActiveTelegraph>();

  constructor(_timeline: CombatTimeline, bus: CombatEventBus);
  constructor(bus: CombatEventBus);
  constructor(_timelineOrBus: CombatTimeline | CombatEventBus, bus?: CombatEventBus) {
    const eventBus = bus ?? (_timelineOrBus as CombatEventBus);

    eventBus.on("TELEGRAPH_START", (event: EngineCombatEvent) => {
      const e = event as TelegraphStartEvent;
      const key = `${e.sourceId}:${e.abilityId}:${e.timestamp}`;
      this.active.set(key, {
        id: key,
        sourceId: e.sourceId,
        abilityId: e.abilityId,
        x: e.x,
        y: e.y,
        telegraph: e.telegraph,
        startedAt: e.timestamp,
        endsAt: e.timestamp + e.telegraph.durationMs,
      });
    });

    eventBus.on("TELEGRAPH_END", (event: EngineCombatEvent) => {
      const e = event as TelegraphEndEvent;
      // naive cleanup: remove all matching ability/source
      for (const [key, t] of this.active.entries()) {
        if (t.sourceId === e.sourceId && t.abilityId === e.abilityId) {
          this.active.delete(key);
        }
      }
    });
  }

  handleEvent(event: EngineCombatEvent): void {
    if (event.type === "TELEGRAPH_START") {
      const e = event as TelegraphStartEvent;
      const key = `${e.sourceId}:${e.abilityId}:${e.timestamp}`;
      this.active.set(key, {
        id: key,
        sourceId: e.sourceId,
        abilityId: e.abilityId,
        x: e.x,
        y: e.y,
        telegraph: e.telegraph,
        startedAt: e.timestamp,
        endsAt: e.timestamp + e.telegraph.durationMs,
      });
    }

    if (event.type === "TELEGRAPH_END") {
      const e = event as TelegraphEndEvent;
      for (const [key, t] of this.active.entries()) {
        if (t.sourceId === e.sourceId && t.abilityId === e.abilityId) {
          this.active.delete(key);
        }
      }
    }
  }

  getActive(): ActiveTelegraph[] {
    return [...this.active.values()];
  }
}
