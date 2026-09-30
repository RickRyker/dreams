// server/test/accounts/services/AccountService.test.ts

import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccountService } from "../../../src/accounts/services/AccountService";

describe("AccountService", () => {
  beforeEach(() => {
    (bcrypt.hash as unknown as jest.Mock).mockReset();
    (bcrypt.compare as unknown as jest.Mock).mockReset();
    (jwt.sign as unknown as jest.Mock).mockReset();
  });

  it("register creates account when email is available", async () => {
    const now = new Date();
    const repo = {
      findByEmail: jest.fn(async () => null),
      createAccount: jest.fn(async () => ({
        id: "acc1",
        email: "test@example.com",
        emailVerifiedAt: null,
        createdAt: now,
        updatedAt: now,
      })),
    };

    (bcrypt.hash as unknown as jest.Mock).mockImplementation(async () => "hashed-pw");

    const service = new AccountService(repo as any);
    const result = await service.register("test@example.com", "password123");

    expect((repo.findByEmail as jest.Mock).mock.calls[0]).toEqual(["test@example.com"]);
    expect((bcrypt.hash as unknown as jest.Mock).mock.calls[0]).toEqual(["password123", 12]);
    expect((repo.createAccount as jest.Mock).mock.calls[0]).toEqual(["test@example.com", "hashed-pw"]);
    expect(result.email).toBe("test@example.com");
    expect(result.emailVerifiedAt).toBeNull();
  });

  it("register throws for duplicate email", async () => {
    const repo = {
      findByEmail: jest.fn(async () => ({ id: "acc-existing" })),
    };

    const service = new AccountService(repo as any);

    await expect(service.register("taken@example.com", "password123")).rejects.toThrow(
      "EMAIL_ALREADY_IN_USE"
    );
  });

  it("login throws when account does not exist", async () => {
    const repo = {
      findByEmail: jest.fn(async () => null),
    };

    const service = new AccountService(repo as any);

    await expect(service.login("missing@example.com", "password123")).rejects.toThrow(
      "INVALID_CREDENTIALS"
    );
  });

  it("login throws when password comparison fails", async () => {
    const repo = {
      findByEmail: jest.fn(async () => ({ id: "acc1", passwordHash: "hash" })),
    };

    (bcrypt.compare as unknown as jest.Mock).mockImplementation(async () => false);

    const service = new AccountService(repo as any);

    await expect(service.login("test@example.com", "bad-pass")).rejects.toThrow("INVALID_CREDENTIALS");
  });

  it("login returns account dto and jwt token", async () => {
    const now = new Date();
    const repo = {
      findByEmail: jest.fn(async () => ({
        id: "acc1",
        email: "test@example.com",
        passwordHash: "hash",
        emailVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      })),
    };

    (bcrypt.compare as unknown as jest.Mock).mockImplementation(async () => true);
    (jwt.sign as unknown as jest.Mock).mockImplementation(() => "jwt-token");

    const service = new AccountService(repo as any);
    const result = await service.login("test@example.com", "password123");

    expect((bcrypt.compare as unknown as jest.Mock).mock.calls[0]).toEqual(["password123", "hash"]);
    expect((jwt.sign as unknown as jest.Mock).mock.calls[0][0]).toEqual({ id: "acc1" });
    expect(result.token).toBe("jwt-token");
    expect(result.account.id).toBe("acc1");
  });

  it("getAccount returns null when repository misses", async () => {
    const repo = {
      findById: jest.fn(async () => null),
    };

    const service = new AccountService(repo as any);
    const result = await service.getAccount("missing");

    expect(result).toBeNull();
  });
});

