// server/test/players/services/PlayerQuestsService.test.ts

import { describe, expect, it } from "@jest/globals";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
describe("PlayerQuestService", () => {
  it("has non-empty source file", () => {
    const sourcePath = path.resolve(__dirname, "../../../src/players/services/PlayerQuestService.ts");
    expect(existsSync(sourcePath)).toBe(true);
    const source = readFileSync(sourcePath, "utf8");
    expect(source.trim().length).toBeGreaterThan(0);
  });
});
