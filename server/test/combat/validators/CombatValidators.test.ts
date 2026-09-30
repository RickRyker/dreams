// server/test/combat/validators/CombatValidators.test.ts

import { describe, expect, it } from "@jest/globals";
import {
  CombatIdParamsSchema,
  ParticipantIdParamsSchema,
} from "../../../src/combat/validators/CombatValidators";

describe("CombatValidators", () => {
  describe("CombatIdParamsSchema", () => {
    it("accepts valid UUID for combatId", () => {
      const data = { combatId: "550e8400-e29b-41d4-a716-446655440000" };
      const result = CombatIdParamsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("rejects invalid UUID", () => {
      const data = { combatId: "not-a-uuid" };
      const result = CombatIdParamsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("rejects missing combatId", () => {
      const data = {};
      const result = CombatIdParamsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("ParticipantIdParamsSchema", () => {
    it("accepts valid UUID for participantId", () => {
      const data = { participantId: "550e8400-e29b-41d4-a716-446655440000" };
      const result = ParticipantIdParamsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("rejects invalid UUID", () => {
      const data = { participantId: "not-a-uuid" };
      const result = ParticipantIdParamsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("rejects missing participantId", () => {
      const data = {};
      const result = ParticipantIdParamsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

