// server/test/players/controllers/PlayerSaveController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerSaveController } from "../../../src/players/controllers/PlayerSaveController";

describe("PlayerSaveController", () => {
  it("save returns 200", async () => {
    const service = { update: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerSaveController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { x: 5, y: 6 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.save(req, res, jest.fn());

    expect((service.update as jest.Mock).mock.calls[0]).toEqual(["p1", { x: 5, y: 6 }]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("save returns 403 when playerId missing", async () => {
    const controller = new PlayerSaveController({} as any);
    const req: any = { params: {}, body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.save(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

