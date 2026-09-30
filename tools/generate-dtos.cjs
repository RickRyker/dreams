// tools/generate-dtos.cjs
// Pure CJS, Node-compatible DTO generator.

const fs = require("fs");
const path = require("path");

const zodDir = path.join(__dirname, "../shared/zod");
const dtoDir = path.join(__dirname, "../shared/dto");

if (!fs.existsSync(dtoDir)) fs.mkdirSync(dtoDir, { recursive: true });

function extractSchemaName(fileContent) {
  const match = fileContent.match(/export\s+const\s+(\w+Schema)\s*=/);
  return match ? match[1] : null;
}

function collectSchemaFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSchemaFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith("Schema.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = collectSchemaFiles(zodDir);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const schemaName = extractSchemaName(content);
    if (!schemaName) {
      console.warn("⚠ No schema found in", file);
      continue;
    }

    const base = schemaName.replace("Schema", "");
    const dtoName = `${base}Dto.ts`;
    const schemaImport = path
      .relative(dtoDir, file)
      .replace(/\\/g, "/")
      .replace(".ts", "");

    const dtoContent = `
// shared/dto/${dtoName}
import { z } from "zod";
import { ${schemaName} } from "${schemaImport}";

export type ${base}Dto = z.infer<typeof ${schemaName}>;
`.trim();

    fs.writeFileSync(path.join(dtoDir, dtoName), dtoContent);
    console.log("Generated DTO:", dtoName);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
