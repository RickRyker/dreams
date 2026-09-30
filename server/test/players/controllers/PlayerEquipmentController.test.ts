// server/test/players/controllers/PlayerEquipmentController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerEquipmentController } from "../../../src/players/controllers/PlayerEquipmentController";

describe("PlayerEquipmentController", () => {
  it("equip returns 200", async () => {
    const service = { equip: jest.fn(async () => ({ id: "eq1" })) };
    const controller = new PlayerEquipmentController(service as any);
    const req: any = { params: { playerId: "p1" }, body: { slotType: "HEAD", itemId: "i1" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.equip(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("unequip returns 403 when equipmentId missing", async () => {
    const controller = new PlayerEquipmentController({} as any);
    const req: any = { params: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.unequip(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

