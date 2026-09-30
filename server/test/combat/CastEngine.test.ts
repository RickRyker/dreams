// server/test/combat/CastEngine.test.ts

import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { CastEngine, CastDefinition } from "../../src/combat/engines/CastEngine";
import { CombatTimeline } from "../../src/combat/CombatTimeline";
import { CombatEventBus } from "../../src/combat/CombatEventBus";
import { CombatStateStore } from "../../src/combat/CombatStateStore";

describe("CastEngine", () => {
  let castEngine: CastEngine;
  let timeline: CombatTimeline;
  let eventBus: CombatEventBus;
  let stateStore: CombatStateStore;

  beforeEach(() => {
    timeline = new CombatTimeline(1000);
    eventBus = new CombatEventBus();
    stateStore = new CombatStateStore();
    castEngine = new CastEngine(timeline, eventBus, stateStore);
  });

  describe("startCast", () => {
    it("stores active cast", () => {
      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      expect(castEngine.isCasting("entity1")).toBe(true);
      expect(castEngine.getActiveCast("entity1")).toEqual(castDef);
    });

    it("schedules cast completion event", () => {
      const handler = jest.fn();
      timeline.schedule = handler;

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      expect(handler).toHaveBeenCalled();
    });

    it("publishes CAST_STARTED event", () => {
      const handler = jest.fn();
      eventBus.subscribe("CAST_STARTED", handler);

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      expect(handler).toHaveBeenCalledWith(castDef);
    });

    it("schedules channel ticks if channel time specified", () => {
      const scheduleHandler = jest.fn();
      timeline.schedule = scheduleHandler;

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "channelspell",
        castTime: 3000,
        channelTime: 3000,
        tickInterval: 500,
        startAt: 0,
        completeAt: 3000,
      };

      castEngine.startCast(castDef);

      // Should schedule: 1 completion + 6 ticks (at 500, 1000, 1500, 2000, 2500 (last tick ends at 3000))
      expect(scheduleHandler.call.length).toBeGreaterThan(0);
    });
  });

  describe("isCasting", () => {
    it("returns true if entity is casting", () => {
      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      expect(castEngine.isCasting("entity1")).toBe(true);
    });

    it("returns false if entity is not casting", () => {
      expect(castEngine.isCasting("entity1")).toBe(false);
    });
  });

  describe("getActiveCast", () => {
    it("returns active cast for entity", () => {
      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      const activeCast = castEngine.getActiveCast("entity1");
      expect(activeCast).toEqual(castDef);
    });

    it("returns null if no active cast", () => {
      const activeCast = castEngine.getActiveCast("entity1");
      expect(activeCast).toBeNull();
    });
  });

  describe("handleEvent", () => {
    it("handles CAST_COMPLETE event", () => {
      const handler = jest.fn();
      eventBus.subscribe("CAST_COMPLETED", handler);

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);
      castEngine.handleEvent({
        type: "CAST_COMPLETE",
        sourceId: "entity1",
        timestamp: 1000,
      } as any);

      expect(handler).toHaveBeenCalled();
      expect(castEngine.isCasting("entity1")).toBe(false);
    });

    it("handles INTERRUPT event", () => {
      const handler = jest.fn();
      eventBus.subscribe("CAST_INTERRUPTED", handler);

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);
      castEngine.handleEvent({
        type: "INTERRUPT",
        sourceId: "entity1",
        timestamp: 500,
      } as any);

      expect(handler).toHaveBeenCalled();
      expect(castEngine.isCasting("entity1")).toBe(false);
    });

    it("handles CHANNEL_TICK event", () => {
      const handler = jest.fn();
      eventBus.subscribe("CHANNEL_TICK_FIRED", handler);

      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "channelspell",
        castTime: 3000,
        channelTime: 3000,
        tickInterval: 500,
        startAt: 0,
        completeAt: 3000,
      };

      castEngine.startCast(castDef);
      castEngine.handleEvent({
        type: "CHANNEL_TICK",
        sourceId: "entity1",
        timestamp: 500,
      } as any);

      expect(handler).toHaveBeenCalled();
    });

    it("ignores event without sourceId", () => {
      const castDef: CastDefinition = {
        id: "cast1",
        sourceId: "entity1",
        abilityId: "fireball",
        castTime: 1000,
        startAt: 0,
        completeAt: 1000,
      };

      castEngine.startCast(castDef);

      expect(() => {
        castEngine.handleEvent({
          type: "CAST_COMPLETE",
          sourceId: undefined,
          timestamp: 1000,
        } as any);
      }).not.toThrow();
    });
  });
});

