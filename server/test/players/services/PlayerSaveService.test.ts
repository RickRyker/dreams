// server/test/players/services/PlayerSaveService.test.ts

import { describe, expect, it } from "@jest/globals";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
describe("PlayerSaveService", () => {
  it("has non-empty source file", () => {
    const sourcePath = path.resolve(__dirname, "../../../src/players/services/PlayerSaveService.ts");
    expect(existsSync(sourcePath)).toBe(true);
    const source = readFileSync(sourcePath, "utf8");
    expect(source.trim().length).toBeGreaterThan(0);
  });
});
