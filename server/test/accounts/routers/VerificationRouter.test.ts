// server/test/accounts/routers/VerificationRouter.test.ts

import { describe, expect, it } from "@jest/globals";
import { createVerificationRouter } from "../../../src/accounts/routers/VerificationRouter";

describe("VerificationRouter", () => {
  it("registers request and confirm endpoints", () => {
    const router: any = createVerificationRouter();
    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
        handlers: layer.route.stack.length,
      }));

    expect(routes).toEqual(
      expect.arrayContaining([
        { path: "/request", methods: ["post"], handlers: 2 },
        { path: "/confirm", methods: ["post"], handlers: 1 },
      ])
    );
  });
});

