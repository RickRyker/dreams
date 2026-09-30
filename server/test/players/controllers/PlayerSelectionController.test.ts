// server/test/players/controllers/PlayerSelectionController.test.ts

import { describe, it, expect, jest } from "@jest/globals";
import { PlayerSelectionController } from "../../../src/players/controllers/PlayerSelectionController";

describe("PlayerSelectionController", () => {
  it("returns default character", async () => {
    const mockService = {
      loadDefaultCharacter: jest.fn(async () => ({ id: "p2" })),
    };

    const controller = new PlayerSelectionController(mockService as any);

    const req: any = { user: { id: "acc1" } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.loadDefault(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: "p2" });
  });

  it("returns 401 when unauthenticated", async () => {
    const controller = new PlayerSelectionController({} as any);

    const req: any = { user: undefined };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.loadDefault(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
