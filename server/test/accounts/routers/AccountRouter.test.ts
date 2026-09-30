// server/test/accounts/routers/AccountRouter.test.ts

import { describe, expect, it } from "@jest/globals";
import { createAccountRouter } from "../../../src/accounts/routers/AccountRouter";

describe("AccountRouter", () => {
  it("registers register/login/me routes", () => {
    const router: any = createAccountRouter();
    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
      }));

    expect(routes).toEqual(
      expect.arrayContaining([
        { path: "/register", methods: ["post"] },
        { path: "/login", methods: ["post"] },
        { path: "/me", methods: ["get"] },
      ])
    );
  });
});

