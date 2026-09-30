// server/test/accounts/controllers/PasswordResetController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { PasswordResetController } from "../../../src/accounts/controllers/PasswordResetController";

describe("PasswordResetController", () => {
  it("requestReset returns 200 and calls service", async () => {
    const mockService = {
      requestReset: jest.fn(async () => undefined),
    };

    const controller = new PasswordResetController(mockService as any);
    const req: any = { body: { email: "test@example.com" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.requestReset(req, res, jest.fn());

    expect((mockService.requestReset as jest.Mock).mock.calls[0]).toEqual(["test@example.com"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("performReset returns 200 and calls service", async () => {
    const mockService = {
      performReset: jest.fn(async () => undefined),
    };

    const controller = new PasswordResetController(mockService as any);
    const req: any = { body: { token: "token-1", newPassword: "password123" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.performReset(req, res, jest.fn());

    expect((mockService.performReset as jest.Mock).mock.calls[0]).toEqual(["token-1", "password123"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("requestReset forwards schema errors to next", async () => {
    const controller = new PasswordResetController({ requestReset: jest.fn() } as any);
    const req: any = { body: { email: "not-an-email" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.requestReset(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("performReset forwards service errors to next", async () => {
    const error = new Error("reset failed");
    const mockService = {
      performReset: jest.fn(async () => {
        throw error;
      }),
    };

    const controller = new PasswordResetController(mockService as any);
    const req: any = { body: { token: "token-1", newPassword: "password123" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.performReset(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

