// server/test/players/adapters/PlayerAdapter.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerAdapter } from "../../../src/players/adapters/PlayerAdapter";

describe("PlayerAdapter", () => {
  const now = new Date();

  function model(overrides: Record<string, unknown> = {}) {
    return {
      id: "p1",
      name: "Hero",
      isDefault: false,
      mapId: null,
      x: 1,
      y: 2,
      createdAt: now,
      updatedAt: now,
      ...overrides,
    } as any;
  }

  it("create maps created player", async () => {
    const repo = { createPlayer: jest.fn(async () => model()) };
    const adapter = new PlayerAdapter(repo as any);

    const dto = await adapter.create("acc1", { name: "Hero" });

    expect((repo.createPlayer as jest.Mock).mock.calls[0]).toEqual(["acc1", "Hero"]);
    expect(dto.id).toBe("p1");
    expect(dto.name).toBe("Hero");
  });

  it("findById returns null when missing", async () => {
    const repo = { findById: jest.fn(async () => null) };
    const adapter = new PlayerAdapter(repo as any);

    await expect(adapter.findById("missing")).resolves.toBeNull();
  });

  it("list maps all players", async () => {
    const repo = { listPlayers: jest.fn(async () => [model(), model({ id: "p2" })]) };
    const adapter = new PlayerAdapter(repo as any);

    const list = await adapter.list("acc1");

    expect((repo.listPlayers as jest.Mock).mock.calls[0]).toEqual(["acc1"]);
    expect(list.map((x: any) => x.id)).toEqual(["p1", "p2"]);
  });

  it("update maps dto to prisma update and back", async () => {
    const repo = { update: jest.fn(async () => model({ name: "Updated" })) };
    const adapter = new PlayerAdapter(repo as any);

    const dto = await adapter.update("p1", { mapId: "map1", x: 5, y: 6 });

    const [idArg, updateArgRaw] = (repo.update as jest.Mock).mock.calls[0];
    const updateArg = updateArgRaw as any;
    expect(idArg).toBe("p1");
    expect(updateArg.map).toEqual({ connect: { id: "map1" } });
    expect(updateArg.x).toBe(5);
    expect(updateArg.y).toBe(6);
    expect(dto.name).toBe("Updated");
  });
});

