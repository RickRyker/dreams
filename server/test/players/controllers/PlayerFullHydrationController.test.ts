// server/test/players/controllers/PlayerFullHydrationController.test.ts

import { describe, it, expect, jest } from "@jest/globals";
import { PlayerFullHydrationController } from "../../../src/players/controllers/PlayerFullHydrationController";

describe("PlayerFullHydrationController", () => {
  it("returns hydrated player", async () => {
    const mockHydration = {
      hydrate: jest.fn(async () => ({ id: "p1", name: "Hero" })),
    };

    const controller = new PlayerFullHydrationController(
      mockHydration as any
    );

    const req: any = { params: { playerId: "p1" } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.load(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: "p1", name: "Hero" });
  });

  it("passes errors to next()", async () => {
    const mockHydration = {
      hydrate: jest.fn(async () => {
        throw new Error("FAIL");
      }),
    };

    const controller = new PlayerFullHydrationController(
      mockHydration as any
    );

    const req: any = { params: { playerId: "p1" } };
    const next = jest.fn();

    await controller.load(req, {} as any, next);

    expect(next).toHaveBeenCalled();
  });
});
