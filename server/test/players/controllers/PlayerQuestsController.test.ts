// server/test/players/controllers/PlayerQuestsController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerQuestsController } from "../../../src/players/controllers/PlayerQuestsController";

describe("PlayerQuestsController", () => {
  it("startQuest returns 200", async () => {
    const service = { startQuest: jest.fn(async () => ({ id: "pq1" })) };
    const controller = new PlayerQuestsController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { questId: "q1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.startQuest(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("completeQuest returns 403 when questId missing", async () => {
    const controller = new PlayerQuestsController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.completeQuest(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

