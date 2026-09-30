// server/test/players/mappers/PlayerNameHistoryMapper.test.ts

import {describe, expect, it} from "@jest/globals";
import {PlayerNameHistoryMapper} from "../../../src/players/mappers/PlayerNameHistoryMapper";

describe("PlayerNameHistoryMapper", () => {
  it("maps from Prisma to DTO", () => {
    const now = new Date();
    const model = {
      id: "nh1",
      oldName: "Old",
      newName: "New",
      changedAt: now,
      moderatorId: "mod1",
    } as any;

    const dto = PlayerNameHistoryMapper.fromPrisma(model);

    expect(dto.changedAt).toBe(now.getTime());
    expect(dto.newName).toBe("New");
  });
});
