// server/test/players/controllers/PlayerDeleteController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerDeleteController } from "../../../src/players/controllers/PlayerDeleteController";

describe("PlayerDeleteController", () => {
  it("delete returns ok true", async () => {
    const service = { delete: jest.fn(async () => undefined) };
    const controller = new PlayerDeleteController(service as any);
    const req: any = { params: { playerId: "p1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.delete(req, res, jest.fn());

    expect((service.delete as jest.Mock).mock.calls[0]).toEqual(["p1"]);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("delete returns 403 when playerId missing", async () => {
    const controller = new PlayerDeleteController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.delete(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

