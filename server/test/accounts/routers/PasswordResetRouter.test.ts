// server/test/accounts/routers/PasswordResetRouter.test.ts

import { describe, expect, it } from "@jest/globals";
import { createPasswordResetRouter } from "../../../src/accounts/routers/PasswordResetRouter";

describe("PasswordResetRouter", () => {
  it("registers request and perform endpoints", () => {
    const router: any = createPasswordResetRouter();
    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
      }));

    expect(routes).toEqual(
      expect.arrayContaining([
        { path: "/request", methods: ["post"] },
        { path: "/perform", methods: ["post"] },
      ])
    );
  });
});

