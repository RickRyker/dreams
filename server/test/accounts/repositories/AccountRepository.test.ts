// server/test/accounts/repositories/AccountRepository.test.ts

import { describe, expect, it, jest, beforeEach } from "@jest/globals";

const mockPrisma = {
  account: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

jest.mock("../../../src/db/client", () => ({
  prisma: mockPrisma,
}));

import { AccountRepository } from "../../../src/accounts/repositories/AccountRepository";

describe("AccountRepository", () => {
  beforeEach(() => {
    mockPrisma.account.findUnique.mockReset();
    mockPrisma.account.create.mockReset();
    mockPrisma.account.update.mockReset();
  });

  it("findById queries by id", async () => {
    mockPrisma.account.findUnique.mockImplementation(async () => ({ id: "acc1" } as any));
    const repo = new AccountRepository();

    const result = await repo.findById("acc1");

    expect(mockPrisma.account.findUnique).toHaveBeenCalledWith({ where: { id: "acc1" } });
    expect(result).toEqual({ id: "acc1" });
  });

  it("findByEmail queries by email", async () => {
    mockPrisma.account.findUnique.mockImplementation(async () => ({ id: "acc1", email: "test@example.com" } as any));
    const repo = new AccountRepository();

    const result = await repo.findByEmail("test@example.com");

    expect(mockPrisma.account.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
    expect(result).toEqual({ id: "acc1", email: "test@example.com" });
  });

  it("createAccount creates with email/passwordHash", async () => {
    mockPrisma.account.create.mockImplementation(async () => ({ id: "acc1" } as any));
    const repo = new AccountRepository();

    const result = await repo.createAccount("test@example.com", "hash");

    expect(mockPrisma.account.create).toHaveBeenCalledWith({
      data: { email: "test@example.com", passwordHash: "hash" },
    });
    expect(result).toEqual({ id: "acc1" });
  });

  it("update updates by id with data", async () => {
    mockPrisma.account.update.mockImplementation(async () => ({ id: "acc1", email: "u@example.com" } as any));
    const repo = new AccountRepository();

    const data = { email: "u@example.com" } as any;
    const result = await repo.update("acc1", data);

    expect(mockPrisma.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data,
    });
    expect(result).toEqual({ id: "acc1", email: "u@example.com" });
  });
});

