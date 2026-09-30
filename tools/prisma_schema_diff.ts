import * as fs from "fs";
import * as path from "path";

function readSchema(filePath: string): string[] {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/);
}

function diffSchemas(aPath: string, bPath: string) {
  const aLines = readSchema(aPath);
  const bLines = readSchema(bPath);

  console.log(`Comparing:\n  A: ${aPath}\n  B: ${bPath}\n`);

  const max = Math.max(aLines.length, bLines.length);

  for (let i = 0; i < max; i++) {
    const a = aLines[i] ?? "";
    const b = bLines[i] ?? "";

    if (a !== b) {
      console.log(`Line ${i + 1}:`);
      console.log(`  - A: ${a}`);
      console.log(`  - B: ${b}`);
      console.log("");
    }
  }
}

const [,, aFile, bFile] = process.argv;

if (!aFile || !bFile) {
  console.error("Usage: ts-node prisma_schema_diff.ts <schemaA.prisma> <schemaB.prisma>");
  process.exit(1);
}

const aPath = path.resolve(aFile);
const bPath = path.resolve(bFile);

diffSchemas(aPath, bPath);
