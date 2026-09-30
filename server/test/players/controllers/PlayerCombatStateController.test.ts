// server/test/players/controllers/PlayerCombatStateController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerCombatStateController } from "../../../src/players/controllers/PlayerCombatStateController";

describe("PlayerCombatStateController", () => {
  it("enterCombat returns 200", async () => {
    const service = { enterCombat: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerCombatStateController(service as any);
    const req: any = { params: { playerId: "p1", combatId: "c1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.enterCombat(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("status returns inCombat payload", async () => {
    const service = { isInCombat: jest.fn(async () => true) };
    const controller = new PlayerCombatStateController(service as any);
    const req: any = { params: { playerId: "p1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.status(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ inCombat: true });
  });
});

