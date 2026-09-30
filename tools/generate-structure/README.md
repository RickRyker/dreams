# generate-structure

A zero-dependency Node.js tool that scans your entire monorepo and writes a
formatted folder/file tree to an output file. Drop it in your `/tools` folder
and run it from anywhere in the project.

---

## Features

- 🌲 **Three output formats** — `tree` (Markdown), `flat` (Markdown list), `json`
- 🚫 **Smart ignoring** — ships with sensible defaults (`node_modules`, `dist`, `.git`, etc.) and automatically reads your `.gitignore`
- 🔍 **Auto root detection** — walks up from `tools/` to find the repo root via monorepo markers (`pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `package.json`, `.git`)
- 📏 **Depth limiting** — cap traversal depth for large repos
- 🔧 **Fully configurable** — extra ignore patterns, show/hide dot-files, optional stats summary
- ✅ **No dependencies** — uses only Node.js built-ins (Node ≥ 14)

---

## Usage

```bash
# From the repo root (recommended)
node tools/generate-structure/index.cjs

# Or add to root package.json scripts:
# "structure": "node tools/generate-structure/index.cjs"
pnpm run structure
```

## Options

| Flag | Short | Default | Description |
|---|---|---|---|
| `--output <path>` | `-o` | `<root>/STRUCTURE.md` | Where to write the output |
| `--format <type>` | `-f` | `tree` | `tree`, `flat`, or `json` |
| `--root <path>` | `-r` | auto-detected | Root directory to scan |
| `--depth <n>` | `-d` | unlimited | Max traversal depth |
| `--ignore <pattern>` | `-i` | — | Extra ignore pattern (repeatable) |
| `--no-gitignore` | — | false | Skip parsing `.gitignore` |
| `--show-hidden` | — | false | Include dot-files and dot-folders |
| `--stats` | — | false | Append file/folder count summary |
| `--help` | `-h` | — | Print help |

## Examples

```bash
# Default — tree format → STRUCTURE.md at repo root
node tools/generate-structure/index.cjs

# Limit to 3 levels deep + show counts
node tools/generate-structure/index.cjs --depth 3 --stats

# JSON for CI/tooling
node tools/generate-structure/index.cjs --format json --output docs/structure.json

# Ignore test files and snapshots
node tools/generate-structure/index.cjs --ignore "**/*.test.*" --ignore "**/__snapshots__"

# Scan only one sub-package
node tools/generate-structure/index.cjs --root apps/api --output apps/api/STRUCTURE.md
```

# Scan root by name 9 levels deep + show counts from a sub-project in the repo
node ../tools/generate-structure/index.cjs -f tree -r .. --depth 9 --stats

## package.json Integration

```jsonc
{
  "scripts": {
    "structure":      "node tools/generate-structure/index.cjs",
    "structure:json": "node tools/generate-structure/index.cjs --format json --output docs/structure.json",
    "structure:ci":   "node tools/generate-structure/index.cjs --depth 4 --stats"
  }
}
```

## Default Ignore List

`.git` · `node_modules` · `dist` · `build` · `out` · `.next` · `.nuxt` · `.svelte-kit` · `.cache` · `.parcel-cache` · `__pycache__` · `.pytest_cache` · `.mypy_cache` · `coverage` · `.nyc_output` · `.turbo` · `.vercel` · `.netlify` · `.pnp` · `.yarn/cache` · `*.log` · `*.lock` · `.DS_Store` · `Thumbs.db` · `STRUCTURE.md` · `structure.json`

