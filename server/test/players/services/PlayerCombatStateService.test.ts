// server/test/players/services/PlayerCombatStateService.test.ts

import { describe, expect, it } from "@jest/globals";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
describe("PlayerCombatStateService", () => {
  it("has non-empty source file", () => {
    const sourcePath = path.resolve(__dirname, "../../../src/players/services/PlayerCombatStateService.ts");
    expect(existsSync(sourcePath)).toBe(true);
    const source = readFileSync(sourcePath, "utf8");
    expect(source.trim().length).toBeGreaterThan(0);
  });
});
