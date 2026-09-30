// server/test/players/controllers/PlayerEconomyController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerEconomyController } from "../../../src/players/controllers/PlayerEconomyController";

describe("PlayerEconomyController", () => {
  it("addGold returns 200", async () => {
    const service = { addGold: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerEconomyController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { amount: 10 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.addGold(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("transferGold returns 403 when toId missing", async () => {
    const controller = new PlayerEconomyController({} as any);
    const req: any = { params: { fromId: "p1" }, body: { amount: 10 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.transferGold(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

