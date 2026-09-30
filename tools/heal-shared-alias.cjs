#!/usr/bin/env node
// tools/heal-shared-alias.cjs

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const sharedDir = path.join(root, "shared");
const serverDir = path.join(root, "server");
const clientDir = path.join(root, "client");

function log(section, msg) {
  console.log(`\n=== ${section} ===`);
  if (msg) console.log(msg);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function exists(p) {
  return fs.existsSync(p);
}

function run(cmd, cwd = root) {
  console.log(`$ (cwd=${cwd}) ${cmd}`);
  cp.execSync(cmd, { cwd, stdio: "inherit" });
}

log("1. Verifying shared/package.json", "");

const sharedPkgPath = path.join(sharedDir, "package.json");
if (!exists(sharedPkgPath)) {
  console.error("✘ shared/package.json is missing. Aborting.");
  process.exit(1);
}

const sharedPkg = readJson(sharedPkgPath);
let changed = false;

if (sharedPkg.name !== "shared") {
  console.log(`• Fixing shared name: ${sharedPkg.name} -> shared`);
  sharedPkg.name = "shared";
  changed = true;
}

if (!sharedPkg.version) {
  console.log("• Setting shared version to 1.0.0");
  sharedPkg.version = "1.0.0";
  changed = true;
}

if (sharedPkg.main !== "dist/index.js") {
  console.log("• Setting shared main to dist/index.js");
  sharedPkg.main = "dist/index.js";
  changed = true;
}

if (sharedPkg.types !== "dist/index.d.ts") {
  console.log("• Setting shared types to dist/index.d.ts");
  sharedPkg.types = "dist/index.d.ts";
  changed = true;
}

sharedPkg.private = true;

sharedPkg.scripts = sharedPkg.scripts || {};
if (sharedPkg.scripts.build !== "tsc -b") {
  console.log("• Setting shared build script to 'tsc -b'");
  sharedPkg.scripts.build = "tsc -b";
  changed = true;
}
if (!sharedPkg.scripts.clean) {
  sharedPkg.scripts.clean = "rimraf dist";
  changed = true;
}
if (!sharedPkg.scripts.watch) {
  sharedPkg.scripts.watch = "tsc -b -w";
  changed = true;
}

sharedPkg.devDependencies = sharedPkg.devDependencies || {};
if (!sharedPkg.devDependencies.typescript) {
  console.log("• Adding devDependency: typescript");
  sharedPkg.devDependencies.typescript = "^6.0.3";
  changed = true;
}
if (!sharedPkg.devDependencies.rimraf) {
  console.log("• Adding devDependency: rimraf");
  sharedPkg.devDependencies.rimraf = "^6.1.3";
  changed = true;
}

if (changed) {
  writeJson(sharedPkgPath, sharedPkg);
  console.log("✔ Updated shared/package.json");
} else {
  console.log("✔ shared/package.json already looks good");
}

log("2. Ensuring TypeScript is installed in shared", "");

if (!exists(path.join(sharedDir, "node_modules", "typescript"))) {
  console.log("• Installing typescript in shared workspace");
  run("npm install --workspace shared typescript rimraf --save-dev", root);
} else {
  console.log("✔ typescript already installed in shared");
}

log("3. Building shared workspace", "");

try {
  run("npm run build:shared", root);
  console.log("✔ build:shared succeeded");
} catch (err) {
  console.error("✘ build:shared failed; fix errors above and re-run.");
  process.exit(1);
}

log("4. Ensuring shared is linked into server/client", "");

const serverShared = path.join(serverDir, "node_modules", "shared");
const clientShared = path.join(clientDir, "node_modules", "shared");

let needInstall = false;

if (!exists(serverShared)) {
  console.log("• server/node_modules/shared missing");
  needInstall = true;
} else {
  console.log("✔ server/node_modules/shared exists");
}

if (!exists(clientShared)) {
  console.log("• client/node_modules/shared missing");
  needInstall = true;
} else {
  console.log("✔ client/node_modules/shared exists");
}

if (needInstall) {
  log("5. Running npm install at root to restore workspace links", "");
  run("npm install", root);
} else {
  console.log("✔ Workspace links already present; no npm install needed");
}

log("6. Final check", "");

const finalServerShared = exists(serverShared);
const finalClientShared = exists(clientShared);

console.log(
  `${finalServerShared ? "✔" : "✘"} server → node_modules/shared: ${serverShared}`
);
console.log(
  `${finalClientShared ? "✔" : "✘"} client → node_modules/shared: ${clientShared}`
);

if (finalServerShared && finalClientShared) {
  console.log("\n✅ shared alias is healed and linked into all workspaces.\n");
} else {
  console.log("\n⚠ Some links are still missing. Check npm install output above.\n");
}
