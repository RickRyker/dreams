#!/usr/bin/env node

/**
 * generate-structure
 * ─────────────────────────────────────────────────────────────────────────────
 * Scans the entire monorepo from the project root and writes a formatted
 * folder/file tree to an output file.
 *
 * Usage (from any location in the repo):
 *   node tools/generate-structure/index.cjs [options]
 *
 * Options:
 *   --output, -o   <path>   Output file path  (default: ./STRUCTURE.md)
 *   --format, -f   <type>   Output format: tree | json | flat  (default: tree)
 *   --root,   -r   <path>   Root path to scan  (default: repo root, auto-detected)
 *   --depth,  -d   <n>      Max depth (default: unlimited)
 *   --ignore, -i   <glob>   Extra pattern to ignore (repeatable)
 *   --no-gitignore          Skip .gitignore parsing
 *   --show-hidden           Include dot-files / dot-folders
 *   --stats                 Append summary stats (file/folder counts)
 *   --help, -h              Print this help text
 *
 * Examples:
 *   node tools/generate-structure/index.cjs
 *   node tools/generate-structure/index.cjs --format json --output docs/structure.json
 *   node tools/generate-structure/index.cjs --depth 3 --ignore "**\/*.log"
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Default ignore patterns ──────────────────────────────────────────────────
const DEFAULT_IGNORE = [
  '.git',
  'node_modules',
  '.pnp',
  '.yarn/cache',
  '.yarn/unplugged',
  'dist',
  'build',
  'out',
  '.next',
  '.nuxt',
  '.svelte-kit',
  '.cache',
  '.parcel-cache',
  '__pycache__',
  '.pytest_cache',
  '.mypy_cache',
  'coverage',
  '.nyc_output',
  '.turbo',
  '.vercel',
  '.netlify',
  '*.log',
  '*.lock',         // package-lock.json, yarn.lock, pnpm-lock.yaml
  '.DS_Store',
  'Thumbs.db',
  'STRUCTURE.md',   // don't list ourselves
  'structure.json',
  'cdk.out',
  'prisma/migrations',
];

// ─── CLI argument parsing ─────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {
    output:       null,
    format:       'tree',
    root:         null,
    depth:        Infinity,
    ignore:       [],
    useGitignore: true,
    showHidden:   false,
    stats:        false,
    help:         false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--help':
      case '-h':
        args.help = true;
        break;
      case '--output':
      case '-o':
        args.output = argv[++i];
        break;
      case '--format':
      case '-f':
        args.format = argv[++i];
        break;
      case '--root':
      case '-r':
        args.root = argv[++i];
        break;
      case '--depth':
      case '-d':
        args.depth = parseInt(argv[++i], 10);
        break;
      case '--ignore':
      case '-i':
        args.ignore.push(argv[++i]);
        break;
      case '--no-gitignore':
        args.useGitignore = false;
        break;
      case '--show-hidden':
        args.showHidden = true;
        break;
      case '--stats':
        args.stats = true;
        break;
      default:
        console.warn(`[generate-structure] Unknown option: ${a}`);
    }
  }

  return args;
}

// ─── Help text ────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
generate-structure — Monorepo folder/file tree generator
─────────────────────────────────────────────────────────
Usage:
  node tools/generate-structure/index.js [options]

Options:
  --output,  -o  <path>   Output file path           (default: ./DIRECTORY_STRUCTURE.md)
  --format,  -f  <type>   tree | json | flat          (default: tree)
  --root,    -r  <path>   Directory to scan           (default: repo root)
  --depth,   -d  <n>      Max traversal depth         (default: unlimited)
  --ignore,  -i  <glob>   Extra ignore pattern        (repeatable)
  --no-gitignore          Skip .gitignore parsing
  --show-hidden           Include dot-files/dot-dirs
  --stats                 Append file/folder counts
  --help,    -h           Show this help

Examples:
  node tools/generate-structure/index.js
  node tools/generate-structure/index.js --format json --output docs/structure.json
  node tools/generate-structure/index.js --depth 3 --stats
  node tools/generate-structure/index.js --ignore "**/*.test.*" --show-hidden
`);
}

// ─── Repo root detection ──────────────────────────────────────────────────────
/**
 * Walk upward from startDir until we find a package.json, pnpm-workspace.yaml,
 * lerna.json, or .git directory — whichever comes first.
 */
function findRepoRoot(startDir) {
  const markers = ['pnpm-workspace.yaml', 'lerna.json', 'nx.json', '.git', 'package.json'];
  let dir = path.resolve(startDir);
  const { root } = path.parse(dir);

  while (dir !== root) {
    for (const marker of markers) {
      if (fs.existsSync(path.join(dir, marker))) {
        return dir;
      }
    }
    dir = path.dirname(dir);
  }

  // Fallback: current working directory
  return process.cwd();
}

// ─── .gitignore parser ────────────────────────────────────────────────────────
/**
 * Reads a .gitignore file and returns an array of ignore pattern strings.
 */
function loadGitignore(rootDir) {
  const gitignorePath = path.join(rootDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) return [];

  return fs
    .readFileSync(gitignorePath, 'utf8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

// ─── Pattern matching ─────────────────────────────────────────────────────────
/**
 * Converts a glob-like ignore pattern into a RegExp.
 * Supports: *, **, ?, and literal path segments.
 */
function patternToRegex(pattern) {
  let p = pattern.replace(/^[./\\]+/, '');
  p = p.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  p = p.replace(/\*\*/g, '§GLOBSTAR§');
  p = p.replace(/\*/g, '[^/]*');
  p = p.replace(/\?/g, '[^/]');
  p = p.replace(/§GLOBSTAR§/g, '.*');
  return new RegExp(`(^|/)${p}(/|$)`);
}

/**
 * Returns true if the given relative path should be ignored.
 */
function shouldIgnore(relPath, patterns, showHidden) {
  const name = path.basename(relPath);
  if (!showHidden && name.startsWith('.')) return true;
  const normalized = relPath.replace(/\\/g, '/');
  return patterns.some(rx => rx.test(normalized) || rx.test(name));
}

// ─── Tree traversal ───────────────────────────────────────────────────────────
function scan(absPath, relPath, patterns, showHidden, maxDepth, currentDepth) {
  const name = path.basename(absPath) || absPath;
  const node = { name, type: 'directory', children: [] };

  if (currentDepth > maxDepth) {
    node.truncated = true;
    return node;
  }

  let entries;
  try {
    entries = fs.readdirSync(absPath, { withFileTypes: true });
  } catch {
    node.error = 'permission denied';
    return node;
  }

  // Sort: directories first, then files, both alphabetically
  entries.sort((a, b) => {
    const aIsDir = a.isDirectory() ? 0 : 1;
    const bIsDir = b.isDirectory() ? 0 : 1;
    if (aIsDir !== bIsDir) return aIsDir - bIsDir;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });

  for (const entry of entries) {
    const childRel = relPath ? `${relPath}/${entry.name}` : entry.name;
    if (shouldIgnore(childRel, patterns, showHidden)) continue;

    if (entry.isDirectory()) {
      node.children.push(scan(
        path.join(absPath, entry.name),
        childRel, patterns, showHidden, maxDepth, currentDepth + 1
      ));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      node.children.push({
        name: entry.name,
        type: entry.isSymbolicLink() ? 'symlink' : 'file',
      });
    }
  }

  return node;
}

// ─── Output: Tree format ──────────────────────────────────────────────────────
const PIPE   = '│   ';
const BRANCH = '├── ';
const LAST   = '└── ';
const BLANK  = '    ';

function renderTree(node, prefix, isLast, lines, isRoot) {
  if (isRoot) {
    lines.push(node.name + '/');
  } else {
    const connector = isLast ? LAST : BRANCH;
    const suffix = node.type === 'directory' ? '/' : node.type === 'symlink' ? ' → (symlink)' : '';
    lines.push(`${prefix}${connector}${node.name}${suffix}`);
  }

  if (node.truncated) {
    const indent = isRoot ? BLANK : prefix + (isLast ? BLANK : PIPE);
    lines.push(`${indent}${LAST}... (max depth reached)`);
    return;
  }
  if (node.error) {
    const indent = isRoot ? BLANK : prefix + (isLast ? BLANK : PIPE);
    lines.push(`${indent}${LAST}[${node.error}]`);
    return;
  }
  if (!node.children || node.children.length === 0) return;

  const childPrefix = isRoot ? '' : prefix + (isLast ? BLANK : PIPE);
  for (let i = 0; i < node.children.length; i++) {
    renderTree(node.children[i], childPrefix, i === node.children.length - 1, lines, false);
  }
}

function buildTreeOutput(rootNode, rootDir, args) {
  const lines = [];
  const now = new Date().toISOString();
  lines.push('# Project Directory Structure');
  lines.push('');
  lines.push(`> Generated by \`tools/generate-structure\`  `);
  lines.push(`> **Root:** \`${rootDir}\`  `);
  lines.push(`> **Date:** ${now}  `);
  if (args.depth !== Infinity) lines.push(`> **Max depth:** ${args.depth}  `);
  lines.push('');
  lines.push('```');
  renderTree(rootNode, '', true, lines, true);
  lines.push('```');

  if (args.stats) {
    const { files, dirs } = countNodes(rootNode);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push(`| | Count |`);
    lines.push(`|---|---|`);
    lines.push(`| 📁 Directories | ${dirs} |`);
    lines.push(`| 📄 Files | ${files} |`);
    lines.push(`| **Total** | **${files + dirs}** |`);
  }

  return lines.join('\n') + '\n';
}

// ─── Output: Flat format ──────────────────────────────────────────────────────
function buildFlatOutput(rootNode, rootDir) {
  const lines = [`# Project Directory Structure — Flat List`, '', `Root: ${rootDir}`, ''];
  const flat = [];

  function collect(node, currentPath) {
    const p = currentPath ? `${currentPath}/${node.name}` : node.name;
    flat.push({ path: p, type: node.type });
    if (node.children) {
      for (const child of node.children) collect(child, p);
    }
  }

  if (rootNode.children) {
    for (const child of rootNode.children) collect(child, '');
  }

  for (const item of flat) {
    const icon = item.type === 'directory' ? '📁' : item.type === 'symlink' ? '🔗' : '📄';
    lines.push(`${icon} ${item.path}${item.type === 'directory' ? '/' : ''}`);
  }

  return lines.join('\n') + '\n';
}

// ─── Output: JSON format ──────────────────────────────────────────────────────
function buildJsonOutput(rootNode, rootDir) {
  return JSON.stringify({ generatedAt: new Date().toISOString(), root: rootDir, tree: rootNode }, null, 2) + '\n';
}

// ─── Stats helper ─────────────────────────────────────────────────────────────
function countNodes(node, acc = { files: 0, dirs: 0 }) {
  if (node.type === 'directory') {
    if (node.children !== undefined) acc.dirs++;
    if (node.children) {
      for (const child of node.children) countNodes(child, acc);
    }
  } else {
    acc.files++;
  }
  return acc;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) { printHelp(); process.exit(0); }

  if (!['tree', 'json', 'flat'].includes(args.format)) {
    console.error(`[generate-structure] Unknown format "${args.format}". Use: tree | json | flat`);
    process.exit(1);
  }

  const repoRoot = args.root ? path.resolve(args.root) : findRepoRoot(__dirname);
  console.log(`[generate-structure] Scanning: ${repoRoot}`);

  const rawPatterns = [...DEFAULT_IGNORE, ...args.ignore];
  if (args.useGitignore) rawPatterns.push(...loadGitignore(repoRoot));
  const patterns = rawPatterns.map(patternToRegex);

  const rootNode = scan(repoRoot, '', patterns, args.showHidden, args.depth, 0);
  rootNode.name  = path.basename(repoRoot) || repoRoot;

  let content, defaultExt;
  switch (args.format) {
    case 'json':
      content = buildJsonOutput(rootNode, repoRoot); defaultExt = 'structure.json'; break;
    case 'flat':
      content = buildFlatOutput(rootNode, repoRoot); defaultExt = 'STRUCTURE.md'; break;
    default:
      content = buildTreeOutput(rootNode, repoRoot, args); defaultExt = 'STRUCTURE.md';
  }

  const outPath = path.resolve(args.output || path.join(repoRoot, defaultExt));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content, 'utf8');

  const { files, dirs } = countNodes(rootNode);
  console.log(`[generate-structure] ✅ Done!`);
  console.log(`[generate-structure]    Format  : ${args.format}`);
  console.log(`[generate-structure]    Folders : ${dirs}`);
  console.log(`[generate-structure]    Files   : ${files}`);
  console.log(`[generate-structure]    Output  : ${outPath}`);
}

main();
