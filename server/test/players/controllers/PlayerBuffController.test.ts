// server/test/players/controllers/PlayerBuffController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerBuffController } from "../../../src/players/controllers/PlayerBuffController";

describe("PlayerBuffController", () => {
  it("apply returns 200 with effect", async () => {
    const service = { applyEffect: jest.fn(async () => ({ id: "fx1" })) };
    const controller = new PlayerBuffController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { effectId: "fx", durationMs: 1000 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.apply(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: "fx1" });
  });

  it("remove returns 403 when effectId missing", async () => {
    const controller = new PlayerBuffController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.remove(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

