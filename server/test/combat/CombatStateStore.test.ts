// server/test/combat/CombatStateStore.test.ts

import { describe, expect, it, beforeEach } from "@jest/globals";
import { CombatStateStore } from "../../src/combat/CombatStateStore";

describe("CombatStateStore", () => {
  let stateStore: CombatStateStore;

  beforeEach(() => {
    stateStore = new CombatStateStore();
  });

  describe("ensureEntity", () => {
    it("creates entity with default max HP", () => {
      const entity = stateStore.ensureEntity("entity1");
      expect(entity.entityId).toBe("entity1");
      expect(entity.maxHp).toBe(100);
      expect(entity.hp).toBe(100);
    });

    it("creates entity with custom max HP", () => {
      const entity = stateStore.ensureEntity("entity1", 250);
      expect(entity.maxHp).toBe(250);
      expect(entity.hp).toBe(250);
    });

    it("returns existing entity if already created", () => {
      const entity1 = stateStore.ensureEntity("entity1", 150);
      const entity2 = stateStore.ensureEntity("entity1");
      expect(entity2.maxHp).toBe(150);
      expect(entity2.hp).toBe(150);
    });

    it("initializes with shield and empty effects", () => {
      const entity = stateStore.ensureEntity("entity1");
      expect(entity.shield).toBe(0);
      expect(entity.buffs).toEqual([]);
      expect(entity.debuffs).toEqual([]);
    });
  });

  describe("getEntity", () => {
    it("returns entity if exists", () => {
      stateStore.ensureEntity("entity1", 200);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.maxHp).toBe(200);
    });

    it("returns undefined if entity does not exist", () => {
      const entity = stateStore.getEntity("unknown");
      expect(entity).toBeUndefined();
    });
  });

  describe("getAllEntities", () => {
    it("returns empty array when no entities", () => {
      const entities = stateStore.getAllEntities();
      expect(entities).toEqual([]);
    });

    it("returns all entities", () => {
      stateStore.ensureEntity("entity1");
      stateStore.ensureEntity("entity2");
      const entities = stateStore.getAllEntities();
      expect(entities.length).toBe(2);
    });
  });

  describe("applyDamage", () => {
    it("reduces HP", () => {
      stateStore.ensureEntity("entity1", 100);
      stateStore.applyDamage("entity1", 30);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.hp).toBe(70);
    });

    it("uses shield before HP", () => {
      const entity = stateStore.ensureEntity("entity1", 100);
      entity.shield = 50;
      stateStore.applyDamage("entity1", 60);
      const updated = stateStore.getEntity("entity1");
      expect(updated?.shield).toBe(0);
      expect(updated?.hp).toBe(90);
    });

    it("prevents negative HP", () => {
      stateStore.ensureEntity("entity1", 50);
      stateStore.applyDamage("entity1", 100);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.hp).toBe(0);
    });

    it("creates entity if not exists", () => {
      stateStore.applyDamage("newEntity", 30);
      const entity = stateStore.getEntity("newEntity");
      expect(entity).toBeDefined();
      expect(entity?.hp).toBe(70);
    });
  });

  describe("applyHeal", () => {
    it("increases HP", () => {
      const entity = stateStore.ensureEntity("entity1", 100);
      entity.hp = 50;
      stateStore.applyHeal("entity1", 20);
      const updated = stateStore.getEntity("entity1");
      expect(updated?.hp).toBe(70);
    });

    it("caps HP at max", () => {
      const entity = stateStore.ensureEntity("entity1", 100);
      entity.hp = 90;
      stateStore.applyHeal("entity1", 50);
      const updated = stateStore.getEntity("entity1");
      expect(updated?.hp).toBe(100);
    });

    it("creates entity if not exists with default maxHp", () => {
      stateStore.applyHeal("newEntity", 30);
      const entity = stateStore.getEntity("newEntity");
      expect(entity?.hp).toBeLessThanOrEqual(100);
      expect(entity?.hp).toBeGreaterThanOrEqual(30);
    });
  });

  describe("applyShield", () => {
    it("increases shield", () => {
      stateStore.ensureEntity("entity1", 100);
      stateStore.applyShield("entity1", 50);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.shield).toBe(50);
    });

    it("accumulates shields", () => {
      stateStore.ensureEntity("entity1", 100);
      stateStore.applyShield("entity1", 30);
      stateStore.applyShield("entity1", 20);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.shield).toBe(50);
    });

    it("creates entity if not exists", () => {
      stateStore.applyShield("newEntity", 25);
      const entity = stateStore.getEntity("newEntity");
      expect(entity?.shield).toBe(25);
    });
  });

  describe("setInterrupted", () => {
    it("sets interrupted flag", () => {
      stateStore.ensureEntity("entity1");
      stateStore.setInterrupted("entity1", true);
      const entity = stateStore.getEntity("entity1");
      expect(entity?.interrupted).toBe(true);
    });

    it("can clear interrupted flag", () => {
      const entity = stateStore.ensureEntity("entity1");
      entity.interrupted = true;
      stateStore.setInterrupted("entity1", false);
      const updated = stateStore.getEntity("entity1");
      expect(updated?.interrupted).toBe(false);
    });
  });
});



