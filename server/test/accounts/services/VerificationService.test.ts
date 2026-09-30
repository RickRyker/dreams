// server/test/accounts/services/VerificationService.test.ts

import { beforeEach, describe, expect, it, jest } from "@jest/globals";

const mockPrisma = {
  verificationToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  account: {
    update: jest.fn(),
  },
};

jest.mock("../../../src/db/client", () => ({
  prisma: mockPrisma,
}));

import { VerificationService } from "../../../src/accounts/services/VerificationService";

describe("VerificationService", () => {
  beforeEach(() => {
    mockPrisma.verificationToken.create.mockReset();
    mockPrisma.verificationToken.findUnique.mockReset();
    mockPrisma.verificationToken.delete.mockReset();
    mockPrisma.account.update.mockReset();
  });

  it("createVerificationToken persists token and sends email", async () => {
    const emailService = {
      sendVerificationEmail: jest.fn(async () => undefined),
    };

    mockPrisma.verificationToken.create.mockImplementation(async () => ({ id: "vt1" }));

    const service = new VerificationService(emailService as any);
    await service.createVerificationToken("acc1", "test@example.com");

    expect(mockPrisma.verificationToken.create).toHaveBeenCalled();

    const createArg = mockPrisma.verificationToken.create.mock.calls[0][0] as any;
    expect(createArg.data.accountId).toBe("acc1");
    expect(createArg.data.email).toBe("test@example.com");
    expect(typeof createArg.data.token).toBe("string");

    const expiresAt = createArg.data.expiresAt as Date;
    expect(expiresAt.getTime()).toBeGreaterThan(Date.now());

    expect((emailService.sendVerificationEmail as jest.Mock).mock.calls[0][0]).toBe("test@example.com");
    expect(typeof (emailService.sendVerificationEmail as jest.Mock).mock.calls[0][1]).toBe("string");
  });

  it("verifyEmail throws for invalid token", async () => {
    const emailService = { sendVerificationEmail: jest.fn() };
    mockPrisma.verificationToken.findUnique.mockImplementation(async () => null);

    const service = new VerificationService(emailService as any);

    await expect(service.verifyEmail("bad-token")).rejects.toThrow("INVALID_TOKEN");
  });

  it("verifyEmail updates account and deletes token", async () => {
    const emailService = { sendVerificationEmail: jest.fn() };
    mockPrisma.verificationToken.findUnique.mockImplementation(async () => ({
      token: "good-token",
      accountId: "acc1",
    }));
    mockPrisma.account.update.mockImplementation(async () => ({ id: "acc1" }));
    mockPrisma.verificationToken.delete.mockImplementation(async () => ({ token: "good-token" }));

    const service = new VerificationService(emailService as any);
    await service.verifyEmail("good-token");

    expect(mockPrisma.account.update).toHaveBeenCalledWith({
      where: { id: "acc1" },
      data: { emailVerifiedAt: expect.any(Date) },
    });

    expect(mockPrisma.verificationToken.delete).toHaveBeenCalledWith({ where: { token: "good-token" } });
  });
});

