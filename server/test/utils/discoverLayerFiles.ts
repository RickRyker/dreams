// server/test/utils/discoverLayerFiles.ts

import { readdirSync, statSync } from "node:fs";
import path from "node:path";

export type LayerKind =
  | "assemblers"
  | "adapters"
  | "controllers"
  | "mappers"
  | "repositories"
  | "routers"
  | "services";

export interface DiscoverLayerFilesOptions {
  srcRoot: string;
  includeRoots: string[];
  layerKinds: LayerKind[];
}

function toPosixPath(input: string): string {
  return input.split(path.sep).join("/");
}

function walk(dirPath: string, collector: string[]): void {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, collector);
      continue;
    }

    if (entry.endsWith(".ts") && !entry.endsWith(".d.ts")) {
      collector.push(fullPath);
    }
  }
}

function isLayerFile(relativePathPosix: string, layerKinds: LayerKind[]): boolean {
  if (relativePathPosix.includes("/__tests__/")) return false;
  if (relativePathPosix.endsWith(".test.ts")) return false;

  return layerKinds.some((kind) => {
    const dirMatch =
      kind === "routers"
        ? relativePathPosix.includes("/routers/") || relativePathPosix.includes("/routes/")
        : relativePathPosix.includes(`/${kind}/`);

    const fileMatch =
      kind === "assemblers"
        ? relativePathPosix.endsWith("Assembler.ts")
        : kind === "adapters"
        ? relativePathPosix.endsWith("Adapter.ts")
        : kind === "controllers"
        ? relativePathPosix.endsWith("Controller.ts")
        : kind === "mappers"
        ? relativePathPosix.endsWith("Mapper.ts")
        : kind === "repositories"
        ? relativePathPosix.endsWith("Repository.ts")
        : kind === "routers"
        ? relativePathPosix.endsWith("Router.ts")
        : relativePathPosix.endsWith("Service.ts");

    if (kind === "adapters") {
      return dirMatch || fileMatch;
    }
    if (kind === "assemblers") {
      return dirMatch || fileMatch;
    }
    if (kind === "controllers") {
      return dirMatch || fileMatch;
    }
    if (kind === "mappers") {
      return dirMatch || fileMatch;
    }
    if (kind === "repositories") {
      return dirMatch || fileMatch;
    }
    if (kind === "routers") {
      return dirMatch || fileMatch;
    }
    return dirMatch || fileMatch;
  });
}

export function discoverLayerFiles(options: DiscoverLayerFilesOptions): string[] {
  const { srcRoot, includeRoots, layerKinds } = options;
  const found: string[] = [];

  for (const includeRoot of includeRoots) {
    const absRoot = path.join(srcRoot, includeRoot);
    const collected: string[] = [];
    walk(absRoot, collected);

    for (const fullPath of collected) {
      const relativePath = path.relative(absRoot, fullPath);
      const relativePosix = toPosixPath(relativePath);
      if (!isLayerFile(`/${relativePosix}`, layerKinds)) continue;
      found.push(relativePosix);
    }
  }

  return Array.from(new Set(found)).sort((a, b) => a.localeCompare(b));
}
