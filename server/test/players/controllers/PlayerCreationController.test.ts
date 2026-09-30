// server/test/players/controllers/PlayerCreationController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PlayerCreationController } from "../../../src/players/controllers/PlayerCreationController";

describe("PlayerCreationController", () => {
  it("create returns 201", async () => {
    const service = { create: jest.fn(async () => ({ id: "p1" })) };
    const controller = new PlayerCreationController(service as any);
    const req: any = { params: { accountId: "acc1" }, body: { name: "Hero" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.create(req, res, jest.fn());

    expect((service.create as jest.Mock).mock.calls[0]).toEqual(["acc1", "Hero"]);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("create returns 403 when accountId missing", async () => {
    const controller = new PlayerCreationController({} as any);
    const req: any = { params: {}, body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.create(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });
});

