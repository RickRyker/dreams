import * as fs from "fs";
import * as path from "path";

const source = path.resolve("server/prisma/schema.prisma");
const target = path.resolve("server/prisma/schema-mysql.prisma");

const raw = fs.readFileSync(source, "utf8");

// naive transforms: Postgres → MySQL
let out = raw;

// change provider
out = out.replace(/provider\s*=\s*"postgresql"/g, 'provider = "mysql"');

// remove obvious Postgres-only preview features if present
out = out.replace(/previewFeatures\s*=\s*\[.*?]/g, "");

// you can add more targeted replacements here as needed

fs.writeFileSync(target, out, "utf8");

console.log(`Converted ${source} → ${target}`);
console.log("Review schema-mysql.prisma manually for engine-specific differences.");
