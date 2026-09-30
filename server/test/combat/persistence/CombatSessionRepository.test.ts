// server/test/combat/persistence/CombatSessionRepository.test.ts

import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { CombatSessionRepository } from "../../../src/combat/repositories/CombatSessionRepository";

describe("CombatSessionRepository", () => {
  let repository: CombatSessionRepository;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      combatSession: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    repository = new CombatSessionRepository(mockPrisma);
  });

  describe("getById", () => {
    it("fetches combat session by ID", async () => {
      const mockSession = {
        id: "session1",
        combatId: "combat1",
        participants: [],
        combatEffects: [],
        combatLogs: [],
        combatThreats: [],
        combatTimelineEvents: [],
      };
      mockPrisma.combatSession.findUnique.mockResolvedValue(mockSession);

      const result = await repository.getById("session1");

      expect(result).toEqual(mockSession);
      expect(mockPrisma.combatSession.findUnique).toHaveBeenCalledWith({
        where: { id: "session1" },
        include: {
          participants: true,
          combatEffects: true,
          combatLogs: true,
          combatThreats: true,
          combatTimelineEvents: true,
        },
      });
    });

    it("returns null if session not found", async () => {
      mockPrisma.combatSession.findUnique.mockResolvedValue(null);

      const result = await repository.getById("unknown");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("creates a new combat session", async () => {
      const mockSession = {
        id: "new-session",
        mapId: "map1",
      };
      mockPrisma.combatSession.create.mockResolvedValue(mockSession);

      const result = await repository.create({ mapId: "map1" });

      expect(result).toEqual(mockSession);
      expect(mockPrisma.combatSession.create).toHaveBeenCalledWith({
        data: { mapId: "map1" },
      });
    });
  });

  describe("update", () => {
    it("updates an existing combat session", async () => {
      const mockSession = {
        id: "session1",
      };
      mockPrisma.combatSession.update.mockResolvedValue(mockSession);

      const result = await repository.update("session1", {});

      expect(result).toEqual(mockSession);
      expect(mockPrisma.combatSession.update).toHaveBeenCalledWith({
        where: { id: "session1" },
        data: {},
      });
    });
  });

  describe("delete", () => {
    it("deletes a combat session", async () => {
      mockPrisma.combatSession.delete.mockResolvedValue({});

      await repository.delete("session1");

      expect(mockPrisma.combatSession.delete).toHaveBeenCalledWith({
        where: { id: "session1" },
      });
    });
  });
});

