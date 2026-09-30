// server/test/accounts/adapters/AccountAdapter.test.ts

import { describe, expect, it, jest } from "@jest/globals";
import { AccountAdapter } from "../../../src/accounts/adapters/AccountAdapter";

describe("AccountAdapter", () => {
  it("findById maps repository model to dto", async () => {
    const now = new Date();
    const mockRepo = {
      findById: jest.fn(async () => ({
        id: "acc1",
        email: "test@example.com",
        emailVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      })),
    };

    const adapter = new AccountAdapter(mockRepo as any);
    const dto = await adapter.findById("acc1");

    expect((mockRepo.findById as jest.Mock).mock.calls[0]).toEqual(["acc1"]);
    expect(dto).toMatchObject({
      id: "acc1",
      email: "test@example.com",
      emailVerified: true,
      emailVerifiedAt: now.getTime(),
    });
  });

  it("findByEmail returns null when repository misses", async () => {
    const mockRepo = {
      findByEmail: jest.fn(async () => null),
    };

    const adapter = new AccountAdapter(mockRepo as any);
    const dto = await adapter.findByEmail("missing@example.com");

    expect((mockRepo.findByEmail as jest.Mock).mock.calls[0]).toEqual(["missing@example.com"]);
    expect(dto).toBeNull();
  });

  it("update maps dto update to prisma input then back to dto", async () => {
    const now = new Date();
    const mockRepo = {
      update: jest.fn(async () => ({
        id: "acc1",
        email: "updated@example.com",
        emailVerifiedAt: now,
        createdAt: now,
        updatedAt: now,
      })),
    };

    const adapter = new AccountAdapter(mockRepo as any);
    const ts = now.getTime();
    const dto = await adapter.update("acc1", { email: "updated@example.com", emailVerifiedAt: ts });

    const [idArg, prismaUpdateRaw] = (mockRepo.update as jest.Mock).mock.calls[0];
    const prismaUpdate = prismaUpdateRaw as any;
    expect(idArg).toBe("acc1");
    expect(prismaUpdate.email).toBe("updated@example.com");
    expect(prismaUpdate.emailVerifiedAt).toEqual(new Date(ts));
    expect(dto?.email).toBe("updated@example.com");
  });
});

