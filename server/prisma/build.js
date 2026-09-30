import fs from "fs";
import path from "path";

const prismaDir = path.resolve("./prisma");
const modulesDir = path.join(prismaDir, "modules");
const headerFile = path.join(prismaDir, "header.prisma");
const outputFile = path.join(prismaDir, "schema.prisma");

// Read header
const header = fs.readFileSync(headerFile, "utf8");

// Read all module files
const modules = fs
    .readdirSync(modulesDir)
    .filter((f) => f.endsWith(".prisma"))
    .map((f) => fs.readFileSync(path.join(modulesDir, f), "utf8"))
    .join("\n\n");

// Write final schema
fs.writeFileSync(outputFile, `${header}\n\n${modules}`);

console.log("✔ Prisma schema built successfully.");
