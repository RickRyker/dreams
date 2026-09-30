#!/usr/bin/env node
// tools/fix-esm-specifiers.cjs
const fs = require("fs");
const path = require("path");

const target = process.argv[2];
if (!target) {
  console.error("Usage: node tools/fix-esm-specifiers.cjs <dist-dir>");
  process.exit(1);
}

const rootDir = path.resolve(process.cwd(), target);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    if (entry.isFile() && full.endsWith(".js")) {
      out.push(full);
    }
  }
}

function withJsSpecifier(baseDir, specifier) {
  if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
    return specifier;
  }

  if (
    specifier.endsWith(".js") ||
    specifier.endsWith(".mjs") ||
    specifier.endsWith(".cjs") ||
    specifier.endsWith(".json")
  ) {
    return specifier;
  }

  const asFile = path.resolve(baseDir, `${specifier}.js`);
  if (fs.existsSync(asFile)) {
    return `${specifier}.js`;
  }

  const asIndex = path.resolve(baseDir, specifier, "index.js");
  if (fs.existsSync(asIndex)) {
    return `${specifier}/index.js`;
  }

  return specifier;
}

function patchFile(filePath) {
  const dir = path.dirname(filePath);
  let source = fs.readFileSync(filePath, "utf8");

  source = source.replace(
    /(from\s+["'])([^"']+)(["'])/g,
    (match, prefix, specifier, suffix) => {
      return `${prefix}${withJsSpecifier(dir, specifier)}${suffix}`;
    }
  );

  source = source.replace(
    /(import\(\s*["'])([^"']+)(["']\s*\))/g,
    (match, prefix, specifier, suffix) => {
      return `${prefix}${withJsSpecifier(dir, specifier)}${suffix}`;
    }
  );

  fs.writeFileSync(filePath, source, "utf8");
}

if (!fs.existsSync(rootDir)) {
  console.error(`Directory not found: ${rootDir}`);
  process.exit(1);
}

const files = [];
walk(rootDir, files);
for (const file of files) {
  patchFile(file);
}

console.log(`Patched ESM specifiers in ${files.length} file(s).`);
