// server/test/players/adapters/PlayerHydrationAdapter.test.ts

import { describe, expect, it, jest } from "@jest/globals";

jest.mock("../../../src/players/mappers/PlayerMapper", () => ({
  PlayerMapper: { fromPrisma: jest.fn((m: any) => ({ id: m.id, name: m.name ?? "Player" })) },
}));

jest.mock("../../../src/players/mappers/PlayerStatsMapper", () => ({
  PlayerStatsMapper: { fromPrisma: jest.fn(() => ({ hp: 10 })) },
}));

jest.mock("../../../src/players/mappers/PlayerEquipmentMapper", () => ({
  PlayerEquipmentMapper: { fromPrisma: jest.fn((x: any) => ({ id: x.id })) },
}));

jest.mock("../../../src/players/mappers/InventoryItemMapper", () => ({
  InventoryItemMapper: { fromPrisma: jest.fn((x: any) => ({ id: x.id })) },
}));

jest.mock("../../../src/players/mappers/SpellMapper", () => ({
  SpellMapper: { fromPrisma: jest.fn((x: any) => ({ id: x.id })) },
}));

jest.mock("../../../src/players/mappers/SkillMapper", () => ({
  SkillMapper: { fromPrisma: jest.fn((x: any) => ({ id: x.id })) },
}));

jest.mock("../../../src/players/mappers/PlayerQuestMapper", () => ({
  PlayerQuestMapper: { fromPrisma: jest.fn((x: any) => ({ id: x.id })) },
}));

import { PlayerHydrationAdapter } from "../../../src/players/adapters/PlayerHydrationAdapter";

describe("PlayerHydrationAdapter", () => {
  it("throws when player not found", async () => {
    const repo = { findFullPlayer: jest.fn(async () => null) };
    const adapter = new PlayerHydrationAdapter(repo as any);

    await expect(adapter.hydrate("p1")).rejects.toThrow("PLAYER_NOT_FOUND");
  });

  it("hydrates all related collections", async () => {
    const repo = {
      findFullPlayer: jest.fn(async () => ({
        id: "p1",
        name: "Hero",
        stats: {},
        equipment: [{ id: "e1" }],
        inventory: [{ id: "i1" }],
        spells: [{ id: "s1" }],
        skills: [{ id: "sk1" }],
        quests: [{ id: "q1" }],
      })),
    };

    const adapter = new PlayerHydrationAdapter(repo as any);
    const dto = await adapter.hydrate("p1");

    expect((repo.findFullPlayer as jest.Mock).mock.calls[0]).toEqual(["p1"]);
    expect(dto.id).toBe("p1");
    expect(dto.equipment).toEqual([{ id: "e1" }]);
    expect(dto.inventory).toEqual([{ id: "i1" }]);
    expect(dto.spells).toEqual([{ id: "s1" }]);
    expect(dto.skills).toEqual([{ id: "sk1" }]);
    expect(dto.quests).toEqual([{ id: "q1" }]);
  });
});

