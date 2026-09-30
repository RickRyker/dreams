// server/test/combat/CombatEventBus.test.ts

import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { CombatEventBus } from "../../src/combat/CombatEventBus";

describe("CombatEventBus", () => {
  let eventBus: CombatEventBus;

  beforeEach(() => {
    eventBus = new CombatEventBus();
  });

  describe("subscribe", () => {
    it("subscribes a handler to an event type", () => {
      const handler = jest.fn();
      eventBus.subscribe("TEST_EVENT", handler);
      eventBus.publish("TEST_EVENT", { test: true });
      expect(handler).toHaveBeenCalledWith({ test: true });
    });

    it("allows multiple handlers for same event", () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      eventBus.subscribe("TEST_EVENT", handler1);
      eventBus.subscribe("TEST_EVENT", handler2);
      eventBus.publish("TEST_EVENT", { data: "test" });
      expect(handler1).toHaveBeenCalledWith({ data: "test" });
      expect(handler2).toHaveBeenCalledWith({ data: "test" });
    });
  });

  describe("unsubscribe", () => {
    it("removes a handler from an event type", () => {
      const handler = jest.fn();
      eventBus.subscribe("TEST_EVENT", handler);
      eventBus.unsubscribe("TEST_EVENT", handler);
      eventBus.publish("TEST_EVENT", { data: "test" });
      expect(handler).not.toHaveBeenCalled();
    });

    it("does not throw when unsubscribing non-existent handler", () => {
      const handler = jest.fn();
      expect(() => {
        eventBus.unsubscribe("TEST_EVENT", handler);
      }).not.toThrow();
    });
  });

  describe("publish", () => {
    it("publishes event to all subscribers", () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      eventBus.subscribe("TEST_EVENT", handler1);
      eventBus.subscribe("TEST_EVENT", handler2);
      const payload = { value: 42 };
      eventBus.publish("TEST_EVENT", payload);
      expect(handler1).toHaveBeenCalledWith(payload);
      expect(handler2).toHaveBeenCalledWith(payload);
    });

    it("does not call handlers for unrelated events", () => {
      const handler = jest.fn();
      eventBus.subscribe("TEST_EVENT", handler);
      eventBus.publish("OTHER_EVENT", {});
      expect(handler).not.toHaveBeenCalled();
    });

    it("does not throw when publishing to non-existent event", () => {
      expect(() => {
        eventBus.publish("NON_EXISTENT_EVENT", {});
      }).not.toThrow();
    });
  });

  describe("convenience methods", () => {
    it("emitCombatEvent publishes COMBAT_EVENT", () => {
      const handler = jest.fn();
      eventBus.subscribe("COMBAT_EVENT", handler);
      const event = { type: "ATTACK" } as any;
      eventBus.emitCombatEvent(event);
      expect(handler).toHaveBeenCalledWith(event);
    });

    it("emitResolution publishes COMBAT_EVENT_RESOLVED", () => {
      const handler = jest.fn();
      eventBus.subscribe("COMBAT_EVENT_RESOLVED", handler);
      const resolution = { success: true } as any;
      eventBus.emitResolution(resolution);
      expect(handler).toHaveBeenCalledWith(resolution);
    });

    it("emitSnapshot publishes SNAPSHOT_CREATED", () => {
      const handler = jest.fn();
      eventBus.subscribe("SNAPSHOT_CREATED", handler);
      const snapshot = { timestamp: 100 } as any;
      eventBus.emitSnapshot(snapshot);
      expect(handler).toHaveBeenCalledWith(snapshot);
    });
  });
});

