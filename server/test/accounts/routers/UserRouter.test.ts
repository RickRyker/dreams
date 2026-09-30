// server/test/accounts/routers/UserRouter.test.ts

import { Router } from "express";
import { describe, expect, it, jest } from "@jest/globals";

const accountRouter = Router();
const playerRouter = Router();
const verifyRouter = Router();
const passwordRouter = Router();

const createAccountRouterMock = jest.fn(() => accountRouter);
const createPlayerRouterMock = jest.fn(() => playerRouter);
const createVerificationRouterMock = jest.fn(() => verifyRouter);
const createPasswordResetRouterMock = jest.fn(() => passwordRouter);

jest.mock("../../../src/accounts/routers/AccountRouter", () => ({
  createAccountRouter: createAccountRouterMock,
}));

jest.mock("../../../src/players/routers/PlayerRouter", () => ({
  createPlayerRouter: createPlayerRouterMock,
}));

jest.mock("../../../src/accounts/routers/VerificationRouter", () => ({
  createVerificationRouter: createVerificationRouterMock,
}));

jest.mock("../../../src/accounts/routers/PasswordResetRouter", () => ({
  createPasswordResetRouter: createPasswordResetRouterMock,
}));

import { createUserRouter } from "../../../src/accounts/routers/UserRouter";

describe("UserRouter", () => {
  it("mounts account, player, verify, and password sub-routers", () => {
    const router: any = createUserRouter();
    const mounted = router.stack.filter((layer: any) => !layer.route);

    expect(mounted.length).toBeGreaterThanOrEqual(4);

    expect(createAccountRouterMock).toHaveBeenCalled();
    expect(createPlayerRouterMock).toHaveBeenCalled();
    expect(createVerificationRouterMock).toHaveBeenCalled();
    expect(createPasswordResetRouterMock).toHaveBeenCalled();
  });
});

