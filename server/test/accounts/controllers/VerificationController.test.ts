// server/test/accounts/controllers/VerificationController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { VerificationController } from "../../../src/accounts/controllers/VerificationController";

describe("VerificationController", () => {
  it("requestVerification returns 400 for missing account/email", async () => {
    const controller = new VerificationController({} as any);
    const req: any = { user: undefined, body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.requestVerification(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "BAD_REQUEST" });
  });

  it("requestVerification returns 200 and calls service", async () => {
    const mockService = {
      createVerificationToken: jest.fn(async () => undefined),
    };

    const controller = new VerificationController(mockService as any);
    const req: any = { user: { id: "acc1" }, body: { email: "test@example.com" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.requestVerification(req, res, jest.fn());

    expect((mockService.createVerificationToken as jest.Mock).mock.calls[0]).toEqual(["acc1", "test@example.com"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("verifyEmail returns 200 and calls service", async () => {
    const mockService = {
      verifyEmail: jest.fn(async () => undefined),
    };

    const controller = new VerificationController(mockService as any);
    const req: any = { body: { token: "verify-token" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await controller.verifyEmail(req, res, jest.fn());

    expect((mockService.verifyEmail as jest.Mock).mock.calls[0]).toEqual(["verify-token"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("verifyEmail forwards schema errors to next", async () => {
    const controller = new VerificationController({ verifyEmail: jest.fn() } as any);
    const req: any = { body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.verifyEmail(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("requestVerification forwards service errors to next", async () => {
    const error = new Error("email error");
    const mockService = {
      createVerificationToken: jest.fn(async () => {
        throw error;
      }),
    };

    const controller = new VerificationController(mockService as any);
    const req: any = { user: { id: "acc1" }, body: { email: "test@example.com" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.requestVerification(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});


