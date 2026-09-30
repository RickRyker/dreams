// server/test/combat/ThreatEngine.test.ts

import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { ThreatEngine } from "../../src/combat/engines/ThreatEngine";
import { CombatEventBus } from "../../src/combat/CombatEventBus";

describe("ThreatEngine", () => {
  let threatEngine: ThreatEngine;
  let eventBus: CombatEventBus;

  beforeEach(() => {
    eventBus = new CombatEventBus();
    threatEngine = new ThreatEngine(eventBus);
  });

  describe("apply", () => {
    it("applies threat from source to target", () => {
      const change = {
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 50,
      };
      threatEngine.apply(change);
      const table = threatEngine.getThreatTable("target1");
      expect(table.attacker1).toBe(50);
    });

    it("accumulates threat from same source", () => {
      const change1 = {
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 30,
      };
      const change2 = {
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 20,
      };
      threatEngine.apply(change1);
      threatEngine.apply(change2);
      const table = threatEngine.getThreatTable("target1");
      expect(table.attacker1).toBe(50);
    });

    it("applies threat modifiers", () => {
      threatEngine.setThreatModifier("tank", 1.5);
      const change = {
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "tank",
        amount: 100,
      };
      threatEngine.apply(change);
      const table = threatEngine.getThreatTable("target1");
      expect(table.tank).toBe(150);
    });

    it("publishes THREAT_UPDATED event", () => {
      const handler = jest.fn();
      eventBus.subscribe("THREAT_UPDATED", handler);
      const change = {
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 50,
      };
      threatEngine.apply(change);
      expect(handler).toHaveBeenCalledWith({
        targetId: "target1",
        sourceId: "attacker1",
        newValue: 50,
      });
    });
  });

  describe("getPrimaryAggro", () => {
    it("returns the highest threat source", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 30,
      });
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker2",
        amount: 50,
      });
      const primary = threatEngine.getPrimaryAggro("target1");
      expect(primary).toBe("attacker2");
    });

    it("returns null for unknown target", () => {
      const primary = threatEngine.getPrimaryAggro("unknown");
      expect(primary).toBeNull();
    });

    it("returns null when threat table is empty", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 10,
      });
      threatEngine.resetThreat("target1");
      const primary = threatEngine.getPrimaryAggro("target1");
      expect(primary).toBeNull();
    });
  });

  describe("setThreatModifier", () => {
    it("modifies threat multiplier for an entity", () => {
      threatEngine.setThreatModifier("dps", 0.8);
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "dps",
        amount: 100,
      });
      const table = threatEngine.getThreatTable("target1");
      expect(table.dps).toBe(80);
    });

    it("updates threat modifier for existing entity", () => {
      threatEngine.setThreatModifier("entity", 1.0);
      threatEngine.setThreatModifier("entity", 2.0);
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "entity",
        amount: 50,
      });
      const table = threatEngine.getThreatTable("target1");
      expect(table.entity).toBe(100);
    });
  });

  describe("resetThreat", () => {
    it("clears all threat for a target", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 50,
      });
      threatEngine.resetThreat("target1");
      const table = threatEngine.getThreatTable("target1");
      expect(Object.keys(table).length).toBe(0);
    });

    it("publishes THREAT_RESET event", () => {
      const handler = jest.fn();
      eventBus.subscribe("THREAT_RESET", handler);
      threatEngine.resetThreat("target1");
      expect(handler).toHaveBeenCalledWith({ targetId: "target1" });
    });
  });

  describe("transferThreat", () => {
    it("transfers threat from one entity to another", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 100,
      });
      threatEngine.transferThreat("attacker1", "attacker2", "target1", 0.5);
      const table = threatEngine.getThreatTable("target1");
      expect(table.attacker1).toBe(50);
      expect(table.attacker2).toBe(50);
    });

    it("publishes THREAT_TRANSFERRED event", () => {
      const handler = jest.fn();
      eventBus.subscribe("THREAT_TRANSFERRED", handler);
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 100,
      });
      threatEngine.transferThreat("attacker1", "attacker2", "target1", 0.3);
      expect(handler).toHaveBeenCalledWith({
        targetId: "target1",
        from: "attacker1",
        to: "attacker2",
        amount: 30,
      });
    });

    it("handles transfer of 100%", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 100,
      });
      threatEngine.transferThreat("attacker1", "attacker2", "target1", 1.0);
      const table = threatEngine.getThreatTable("target1");
      expect(table.attacker1).toBe(0);
      expect(table.attacker2).toBe(100);
    });
  });

  describe("decayThreat", () => {
    it("reduces threat by percentage", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 100,
      });
      threatEngine.decayThreat("target1", 0.3);
      const table = threatEngine.getThreatTable("target1");
      expect(table.attacker1).toBe(70);
    });

    it("publishes THREAT_DECAYED event", (done) => {
      const handler = jest.fn();
      eventBus.subscribe("THREAT_DECAYED", handler);
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 100,
      });
      threatEngine.decayThreat("target1", 0.2);
      // Give it a tick to process the event
      setTimeout(() => {
        expect(handler).toHaveBeenCalledWith({
          targetId: "target1",
          percent: 0.2,
        });
        done();
      }, 10);
    });

    it("does nothing for non-existent target", () => {
      expect(() => {
        threatEngine.decayThreat("unknown", 0.5);
      }).not.toThrow();
    });
  });

  describe("getThreatTable", () => {
    it("returns the threat table for a target", () => {
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker1",
        amount: 50,
      });
      threatEngine.apply({
        type: "THREAT_CHANGE" as const,
        targetId: "target1",
        sourceId: "attacker2",
        amount: 30,
      });
      const table = threatEngine.getThreatTable("target1");
      expect(table).toEqual({
        attacker1: 50,
        attacker2: 30,
      });
    });

    it("returns empty object for non-existent target", () => {
      const table = threatEngine.getThreatTable("unknown");
      expect(table).toEqual({});
    });
  });
});
