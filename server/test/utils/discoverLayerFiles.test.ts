// server/test/utils/discoverLayerFiles.test.ts

import { describe, expect, it } from "@jest/globals";
import path from "node:path";
import { discoverLayerFiles } from "./discoverLayerFiles";

describe("discoverLayerFiles", () => {
  const srcRoot = path.resolve(__dirname, "../../src");

  it("discovers accounts layer files", () => {
    const files = discoverLayerFiles({
      srcRoot,
      includeRoots: ["accounts"],
      layerKinds: ["adapters", "controllers", "mappers", "repositories", "routers", "services"],
    });

    expect(files).toContain("adapters/AccountAdapter.ts");
    expect(files).toContain("controllers/AuthController.ts");
    expect(files).toContain("mappers/AccountMapper.ts");
    expect(files).toContain("repositories/AccountRepository.ts");
    expect(files).toContain("routers/AccountRouter.ts");
    expect(files).toContain("services/AccountService.ts");
  });

  it("discovers players layer files", () => {
    const files = discoverLayerFiles({
      srcRoot,
      includeRoots: ["players"],
      layerKinds: ["adapters", "controllers", "mappers", "repositories", "routers", "services"],
    });

    expect(files).toContain("adapters/PlayerAdapter.ts");
    expect(files).toContain("controllers/PlayerCreationController.ts");
    expect(files).toContain("mappers/PlayerMapper.ts");
    expect(files).toContain("repositories/PlayerRepository.ts");
    expect(files).toContain("routers/PlayerRouter.ts");
    expect(files).toContain("services/PlayerService.ts");
  });

  it("discovers combat layer files", () => {
    const files = discoverLayerFiles({
      srcRoot,
      includeRoots: ["combat"],
      layerKinds: ["adapters", "controllers", "mappers", "repositories", "routers", "services"],
    });

    expect(files).toContain("ability/AbilityMapper.ts");
    expect(files).toContain("adapters/CombatEngineAdapter.ts");
    expect(files).toContain("controllers/CombatEventController.ts");
    expect(files).toContain("repositories/CombatCastRepository.ts");
    expect(files).toContain("hotbar/HotbarService.ts");
    expect(files).toContain("routes/CombatRouter.ts");
  });
});

