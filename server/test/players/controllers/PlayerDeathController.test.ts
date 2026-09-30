// server/test/players/controllers/PlayerDeathController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerDeathController } from "../../../src/players/controllers/PlayerDeathController";

describe("PlayerDeathController", () => {
  it("record returns ok true", async () => {
    const service = { recordDeath: jest.fn(async () => undefined) };
    const controller = new PlayerDeathController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { killerId: "k1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.record(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("history returns 403 when playerId missing", async () => {
    const controller = new PlayerDeathController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.history(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

