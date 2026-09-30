# Test Utils

## `discoverLayerFiles.ts`

Utility to auto-discover mapper/repository/service source files under `server/src/{domain}`.

This keeps layer coverage tests up to date when new files are added.

### Example

```ts
import path from "node:path";
import { discoverLayerFiles } from "./discoverLayerFiles";

const files = discoverLayerFiles({
  srcRoot: path.resolve(__dirname, "../../src"),
  includeRoots: ["players"],
  layerKinds: ["adapters", "controllers", "mappers", "repositories", "routers", "services"],
});
```

### Notes

- Returns relative paths (POSIX-style) sorted and deduplicated.
- Ignores `__tests__` directories and `*.test.ts` files.
- Supports these layer kinds: `adapters`, `controllers`, `mappers`, `repositories`, `routers`, `services`.
- For combat, `routes/` is treated as router layer coverage when `routers` is selected.
- Intended for Jest layer-coverage tests.

