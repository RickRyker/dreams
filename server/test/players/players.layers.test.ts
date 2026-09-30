// server/test/players/players.layers.test.ts

import { describe, expect, it } from "@jest/globals";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { discoverLayerFiles } from "../utils/discoverLayerFiles";

const SRC_ROOT = path.resolve(__dirname, "../../src/players");
const files = discoverLayerFiles({
  srcRoot: path.resolve(__dirname, "../../src"),
  includeRoots: ["players"],
  layerKinds: [
    "assemblers",
    "adapters",
    "controllers",
    "mappers",
    "repositories",
    "routers",
    "services",
  ],
});

describe("players layer coverage", () => {
  it.each(files)("has %s", (relativePath) => {
    const fullPath = path.join(SRC_ROOT, relativePath);
    expect(existsSync(fullPath)).toBe(true);
  });

  it.each(files)("%s is non-empty", (relativePath) => {
    const fullPath = path.join(SRC_ROOT, relativePath);
    const content = readFileSync(fullPath, "utf8");
    expect(content.trim().length).toBeGreaterThan(0);
  });
});
