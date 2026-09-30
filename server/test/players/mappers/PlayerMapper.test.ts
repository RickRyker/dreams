// server/test/players/mappers/PlayerMapper.test.ts

import {describe, expect, it} from "@jest/globals";
import {PlayerMapper} from "../../../src/players/mappers/PlayerMapper";

describe("PlayerMapper", () => {
  it("maps null name to fallback", () => {
    const model = {
      id: "p1",
      name: null,
      title: null,
      gender: "MALE",
      mapId: null,
      x: 0,
      y: 0,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    const dto = PlayerMapper.fromPrisma(model);
    expect(dto.name).toBe("Player-p1");
  });

  it("maps update DTO to Prisma update", () => {
    const update = PlayerMapper.toPrisma({ mapId: "map1" });
    expect(update.map).toEqual({ connect: { id: "map1" } });
  });
});
