// server/test/accounts/controllers/AuthController.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { AuthController } from "../../../src/accounts/controllers/AuthController";

describe("AuthController", () => {
  it("register returns 201 with account payload", async () => {
    const mockService = {
      register: jest.fn(async () => ({ id: "acc1", email: "test@example.com" })),
    };

    const controller = new AuthController(mockService as any);
    const req: any = { body: { email: "test@example.com", password: "password123" } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.register(req, res, jest.fn());

    expect((mockService.register as jest.Mock).mock.calls[0]).toEqual(["test@example.com", "password123"]);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "acc1", email: "test@example.com" });
  });

  it("login returns 200 with auth result", async () => {
    const mockService = {
      login: jest.fn(async () => ({ account: { id: "acc1" }, token: "jwt" })),
    };

    const controller = new AuthController(mockService as any);
    const req: any = { body: { email: "test@example.com", password: "password123" } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.login(req, res, jest.fn());

    expect((mockService.login as jest.Mock).mock.calls[0]).toEqual(["test@example.com", "password123"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ account: { id: "acc1" }, token: "jwt" });
  });

  it("me returns 401 when unauthenticated", async () => {
    const controller = new AuthController({} as any);
    const req: any = { user: undefined };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.me(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "UNAUTHENTICATED" });
  });

  it("me returns 404 when account is missing", async () => {
    const mockService = {
      getAccount: jest.fn(async () => null),
    };

    const controller = new AuthController(mockService as any);
    const req: any = { user: { id: "acc1" } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.me(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "NOT_FOUND" });
  });

  it("forwards thrown errors to next", async () => {
    const error = new Error("boom");
    const mockService = {
      register: jest.fn(async () => {
        throw error;
      }),
    };

    const controller = new AuthController(mockService as any);
    const req: any = { body: { email: "test@example.com", password: "password123" } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await controller.register(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

