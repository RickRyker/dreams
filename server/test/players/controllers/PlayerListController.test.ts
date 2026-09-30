// server/test/players/controllers/PlayerListController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerListController } from "../../../src/players/controllers/PlayerListController";

describe("PlayerListController", () => {
  it("list returns 200 with list", async () => {
    const service = { list: jest.fn(async () => [{ id: "p1" }]) };
    const controller = new PlayerListController(service as any);
    const req: any = { params: { accountId: "acc1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.list(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "p1" }]);
  });

  it("list returns 403 when accountId missing", async () => {
    const controller = new PlayerListController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.list(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

