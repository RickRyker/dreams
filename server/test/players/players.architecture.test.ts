// server/test/players/players.architecture.test.ts

import { describe, expect, it } from "@jest/globals";
import { readFileSync } from "node:fs";
import path from "node:path";
import { discoverLayerFiles } from "../utils/discoverLayerFiles";

const SRC_ROOT = path.resolve(__dirname, "../../src");
const PLAYERS_ROOT = path.resolve(__dirname, "../../src/players");

function readPlayersFile(relativePath: string): string {
  return readFileSync(path.join(PLAYERS_ROOT, relativePath), "utf8");
}

describe("players layer architecture", () => {
  const adapters = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["adapters"],
  });

  const assemblers = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["assemblers"],
  });

  const controllers = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["controllers"],
  });

  const mappers = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["mappers"],
  });

  const repositories = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["repositories"],
  });

  const routers = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["routers"],
  });

  const services = discoverLayerFiles({
    srcRoot: SRC_ROOT,
    includeRoots: ["players"],
    layerKinds: ["services"],
  });

  it("discovers files for every layer", () => {
    expect(assemblers.length).toBeGreaterThan(0);
    expect(adapters.length).toBeGreaterThan(0);
    expect(controllers.length).toBeGreaterThan(0);
    expect(mappers.length).toBeGreaterThan(0);
    expect(repositories.length).toBeGreaterThan(0);
    expect(routers.length).toBeGreaterThan(0);
    expect(services.length).toBeGreaterThan(0);
  });

  it.each(assemblers)("assembler %s maps client DTOs to internal commands", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("export class");
    expect(content).toMatch(/to(Create|Update|Player|List)/);
  });

  it.each(adapters)("adapter %s composes mapper/repository logic", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("export class");
    expect(/Mapper|Repository/.test(content)).toBe(true);
  });

  it.each(controllers)("controller %s handles express request lifecycle", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("Request");
    expect(content).toContain("Response");
    if (content.includes("next(err)")) {
      expect(content).toContain("NextFunction");
    }
  });

  it.each(mappers)("mapper %s exposes transformation entrypoints", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("export class");
    expect(content).toMatch(/fromPrisma|toPrisma|toDto/);
  });

  it.each(repositories)("repository %s encapsulates prisma operations", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("prisma");
    expect(content).toContain("export class");
  });

  it.each(routers)("router %s wires express routes", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("Router");
    expect(content).toMatch(/router\.(get|post|patch|delete|use)\(/);
  });

  it.each(services)("service %s contains business-layer class", (relativePath) => {
    const content = readPlayersFile(relativePath);
    expect(content).toContain("export class");
    expect(content).not.toContain("router.");
  });
});
