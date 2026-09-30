// server/test/players/controllers/PlayerTeleportController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerTeleportController } from "../../../src/players/controllers/PlayerTeleportController";

describe("PlayerTeleportController", () => {
  it("teleport returns 200", async () => {
    const service = { teleport: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerTeleportController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { mapId: "m1", x: 3, y: 4 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.teleport(req, res, jest.fn());

    expect((service.teleport as jest.Mock).mock.calls[0]).toEqual(["p1", "m1", 3, 4]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("teleport returns 403 when playerId missing", async () => {
    const controller = new PlayerTeleportController({} as any);
    const req: any = { params: {}, body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.teleport(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

