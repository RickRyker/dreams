// server/test/combat/CombatTimeline.test.ts

import { describe, expect, it, beforeEach } from "@jest/globals";
import { CombatTimeline } from "../../src/combat/CombatTimeline";

describe("CombatTimeline", () => {
  let timeline: CombatTimeline;

  beforeEach(() => {
    timeline = new CombatTimeline(1000); // Fixed time origin
  });

  describe("schedule", () => {
    it("schedules an event with timestamp", () => {
      const event = { type: "ATTACK", timestamp: 100 } as any;
      expect(() => timeline.schedule(event)).not.toThrow();
    });

    it("throws error when event missing timestamp", () => {
      const event = { type: "ATTACK" } as any;
      expect(() => timeline.schedule(event)).toThrow();
    });

    it("maintains event order by timestamp", () => {
      timeline.schedule({ type: "A", timestamp: 300 } as any);
      timeline.schedule({ type: "B", timestamp: 100 } as any);
      timeline.schedule({ type: "C", timestamp: 200 } as any);

      expect(timeline.popNextEvent().type).toBe("B");
      expect(timeline.popNextEvent().type).toBe("C");
      expect(timeline.popNextEvent().type).toBe("A");
    });

    it("handles events with same timestamp", () => {
      timeline.schedule({ type: "A", timestamp: 100 } as any);
      timeline.schedule({ type: "B", timestamp: 100 } as any);
      timeline.schedule({ type: "C", timestamp: 100 } as any);

      expect(timeline.hasNextEvent()).toBe(true);
    });
  });

  describe("hasNextEvent", () => {
    it("returns false for empty queue", () => {
      expect(timeline.hasNextEvent()).toBe(false);
    });

    it("returns true when events are scheduled", () => {
      timeline.schedule({ type: "ATTACK", timestamp: 100 } as any);
      expect(timeline.hasNextEvent()).toBe(true);
    });
  });

  describe("popNextEvent", () => {
    it("returns next event in chronological order", () => {
      timeline.schedule({ type: "A", timestamp: 300 } as any);
      timeline.schedule({ type: "B", timestamp: 100 } as any);

      const first = timeline.popNextEvent();
      expect(first.type).toBe("B");
    });

    it("throws when popping from empty queue", () => {
      expect(() => timeline.popNextEvent()).toThrow();
    });

    it("returns all events in order", () => {
      timeline.schedule({ type: "C", timestamp: 300 } as any);
      timeline.schedule({ type: "A", timestamp: 100 } as any);
      timeline.schedule({ type: "B", timestamp: 200 } as any);

      const first = timeline.popNextEvent();
      const second = timeline.popNextEvent();
      const third = timeline.popNextEvent();

      expect(first.type).toBe("A");
      expect(second.type).toBe("B");
      expect(third.type).toBe("C");
    });

    it("removes event from queue", () => {
      timeline.schedule({ type: "ATTACK", timestamp: 100 } as any);
      timeline.popNextEvent();
      expect(timeline.hasNextEvent()).toBe(false);
    });
  });

  describe("getCombatTime", () => {
    it("returns elapsed time since time origin", () => {
      // Time origin was set to 1000 in beforeEach
      // Current time should be > 1000
      const combatTime = timeline.getCombatTime();
      expect(combatTime).toBeGreaterThanOrEqual(0);
    });
  });
});

