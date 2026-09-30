// server/test/accounts/account.assembler.test.ts

import { describe, expect, it } from "@jest/globals";
import { AccountAssembler } from "../../src/accounts/assemblers/AccountAssembler";

describe("AccountAssembler", () => {
  it("maps register/login requests to internal credentials", () => {
    expect(AccountAssembler.toCredentials({ email: "a@example.com", password: "secret" })).toEqual({
      email: "a@example.com",
      password: "secret",
    });
  });

  it("maps internal accounts back to client dto shape", () => {
    expect(
      AccountAssembler.toAccountDto({
        id: "acc-1",
        email: "a@example.com",
        emailVerified: true,
        emailVerifiedAt: 123,
        createdAt: 1,
        updatedAt: 2,
      })
    ).toEqual({
      id: "acc-1",
      email: "a@example.com",
      emailVerified: true,
      emailVerifiedAt: 123,
      createdAt: 1,
      updatedAt: 2,
    });
  });
});
