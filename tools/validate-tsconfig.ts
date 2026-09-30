import fs from "node:fs";
import path from "node:path";

type TsConfig = {
  extends?: string;
  compilerOptions?: Record<string, unknown>;
  references?: { path: string }[];
  include?: string[];
};

const root = process.cwd();

const configs = [
  "tsconfig.base.json",
  "tsconfig.json",
  "shared/tsconfig.json",
  "server/tsconfig.json",
  "client/tsconfig.json",
  "client/tsconfig.app.json",
  "client/tsconfig.node.json",
  "infrastructure/tsconfig.json",
];

function readConfig(rel: string): TsConfig {
  const full = path.join(root, rel);
  const raw = fs.readFileSync(full, "utf8");
  return JSON.parse(raw);
}

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error("❌", msg);
    process.exitCode = 1;
  }
}

function main() {
  console.log("🔍 Validating tsconfig structure…");

  const rootConfig = readConfig("tsconfig.json");
  assert(
    Array.isArray(rootConfig.references),
    "root/tsconfig.json must have project references"
  );

  const clientRoot = readConfig("client/tsconfig.json");
  assert(
    !clientRoot.compilerOptions,
    "client/tsconfig.json must NOT define compilerOptions (project root only)"
  );
  assert(
    clientRoot.references?.some(r => r.path === "./tsconfig.app.json"),
    "client/tsconfig.json must reference ./tsconfig.app.json"
  );

  const appConfig = readConfig("client/tsconfig.app.json");
  assert(
    appConfig.compilerOptions?.["jsx"] === "react-jsx",
    "client/tsconfig.app.json must have jsx: react-jsx"
  );
  assert(
    Array.isArray(appConfig.compilerOptions?.["lib"]) &&
      (appConfig.compilerOptions!["lib"] as string[]).includes("DOM"),
    "client/tsconfig.app.json must include DOM lib"
  );

  const nodeConfig = readConfig("client/tsconfig.node.json");
  assert(
    nodeConfig.compilerOptions?.["types"] &&
      (nodeConfig.compilerOptions!["types"] as string[]).includes("node"),
    "client/tsconfig.node.json must include node types"
  );

  const infraConfig = readConfig("infrastructure/tsconfig.json");
  assert(
    infraConfig.compilerOptions?.["types"] &&
      (infraConfig.compilerOptions!["types"] as string[]).includes("node"),
    "infrastructure/tsconfig.json must include node types"
  );

  console.log(
    process.exitCode === 1
      ? "❌ tsconfig validations failed."
      : "✅ tsconfig validations passed."
  );
}

main();
