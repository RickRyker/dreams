// server/test/players/controllers/PlayerMovementController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerMovementController } from "../../../src/players/controllers/PlayerMovementController";

describe("PlayerMovementController", () => {
  it("move returns 200", async () => {
    const service = { move: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerMovementController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { x: 1, y: 2 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.move(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("moveDelta returns 403 when playerId missing", async () => {
    const controller = new PlayerMovementController({} as any);
    const req: any = { params: {}, body: { dx: 1, dy: 1 } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.moveDelta(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

