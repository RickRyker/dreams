#!/usr/bin/env node
// tools/diagnose-shared-alias.cjs

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const workspaces = ["shared", "server", "client"];

function section(title) {
  console.log("\n=== " + title + " ===");
}

function checkExists(label, filePath) {
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? "✔" : "✘"} ${label}: ${filePath}`);
  return exists;
}

function tryRequire(label, modulePath) {
  try {
    require(modulePath);
    console.log(`✔ require("${modulePath}") succeeded`);
  } catch (err) {
    console.log(`✘ require("${modulePath}") failed: ${err.message}`);
  }
}

section("1. Checking workspace structure");

for (const ws of workspaces) {
  checkExists(`Workspace folder "${ws}"`, path.join(root, ws));
  checkExists(
    `Workspace package.json for "${ws}"`,
    path.join(root, ws, "package.json")
  );
}

section("2. Checking shared workspace");

checkExists("shared/index.ts", path.join(root, "shared", "index.ts"));
checkExists("shared/package.json", path.join(root, "shared", "package.json"));

section("3. Checking node_modules symlinks");

for (const ws of ["server", "client"]) {
  const nm = path.join(root, ws, "node_modules", "shared");
  checkExists(`${ws} → node_modules/shared`, nm);
}

section("4. Testing require() resolution");

tryRequire("root", "shared");
tryRequire("server", path.join(root, "server/node_modules/shared"));
tryRequire("client", path.join(root, "client/node_modules/shared"));

section("5. Checking tsconfig files");

checkExists("root tsconfig.json", path.join(root, "tsconfig.json"));
checkExists("server tsconfig.json", path.join(root, "server", "tsconfig.json"));
checkExists(
  "client tsconfig.json",
  path.join(root, "client", "tsconfig.json")
);

console.log("\nIf all checks are ✔, your shared alias is fully operational.\n");
