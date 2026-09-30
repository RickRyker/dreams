// server/test/players/player.assembler.test.ts

import { describe, expect, it } from "@jest/globals";
import { PlayerAssembler } from "../../src/players/assemblers/PlayerAssembler";

describe("PlayerAssembler", () => {
  it("maps create requests to internal commands", () => {
    expect(PlayerAssembler.toCreateCommand("acc-1", { name: "Hero" })).toEqual({
      accountId: "acc-1",
      name: "Hero",
    });
  });

  it("maps profile domain objects to client dto shape", () => {
    expect(
      PlayerAssembler.toPlayerDto({
        id: "p-1",
        name: "Hero",
        isDefault: true,
        mapId: "map-1",
        x: 10,
        y: 20,
        createdAt: 1,
        updatedAt: 2,
      })
    ).toEqual({
      id: "p-1",
      name: "Hero",
      title: null,
      gender: "",
      level: 1,
      class: "No Class",
      mapId: "map-1",
      x: 10,
      y: 20,
      isDefault: true,
      stats: null,
      equipment: [],
      inventory: [],
      spells: [],
      skills: [],
      quests: [],
    });
  });
});
