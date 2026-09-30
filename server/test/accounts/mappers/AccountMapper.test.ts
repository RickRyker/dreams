// server/test/accounts/mappers/AccountMapper.test.ts

import {describe, expect, it} from "@jest/globals";
import { AccountMapper } from "../../../src/accounts/mappers/AccountMapper";

describe("AccountMapper", () => {
  it("maps from Prisma to DTO", () => {
    const now = new Date();
    const model = {
      id: "acc1",
      email: "test@example.com",
      emailVerifiedAt: now,
      createdAt: now,
      updatedAt: now,
    } as any;

    const dto = AccountMapper.fromPrisma(model);

    expect(dto.emailVerifiedAt).not.toBeNull();
    expect(dto.emailVerifiedAt).toBe(now.getTime());
    expect(dto.emailVerified).toBe(true);
  });

  it("maps unverified account from Prisma to DTO", () => {
    const now = new Date();
    const model = {
      id: "acc2",
      email: "new@example.com",
      emailVerifiedAt: null,
      createdAt: now,
      updatedAt: now,
    } as any;

    const dto = AccountMapper.fromPrisma(model);

    expect(dto.emailVerified).toBe(false);
    expect(dto.emailVerifiedAt).toBeNull();
  });

  it("maps DTO to Prisma update", () => {
    const ts = Date.now();
    const update = AccountMapper.toPrisma({ emailVerifiedAt: ts });

    expect(update.emailVerifiedAt).toEqual(new Date(ts));
  });

  it("maps null emailVerifiedAt to Prisma null", () => {
    const update = AccountMapper.toPrisma({ emailVerifiedAt: null });
    expect(update.emailVerifiedAt).toBeNull();
  });
});
