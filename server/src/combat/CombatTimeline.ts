// server/src/combat/CombatTimeline.ts


import { EngineCombatEvent } from "./types/EngineCombatTypes";

export class CombatTimeline {
  private events: Array<{ event: EngineCombatEvent; at: number }> = [];
  schedule: (event: unknown, at?: number) => void = () => void 0;

  constructor(_tickMs = 0) {}

  add(event: EngineCombatEvent): void {
    this.events.push({ event, at: 0 });
  }

  getAll(): EngineCombatEvent[] {
    return this.events.map((entry) => entry.event);
  }

  clear(): void {
    this.events = [];
  }

  scheduleEvent(event: EngineCombatEvent, at = 0): void {
    this.events.push({ event, at });
    this.events.sort((a, b) => a.at - b.at);
  }

  popNextEvent(): EngineCombatEvent {
    if (!this.events.length) {
      throw new Error("NO_EVENTS");
    }

    return this.events.shift()!.event;
  }

  hasNextEvent(): boolean {
    return this.events.length > 0;
  }

  getCombatTime(): number {
    return this.events[0]?.at ?? 0;
  }
}
