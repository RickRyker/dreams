// server/src/db/client.ts

import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: [
    { level: "query", emit: "event" },
    { level: "error", emit: "stdout" },
    { level: "warn", emit: "stdout" }
  ]
});

prisma.$on("query", (e) => {
  console.log(`\n🟦 Prisma Query: ${e.query}`)
  if (e.params !== "[]") console.log(`🟨 Params: ${e.params}`)
  console.log(`🕒 Duration: ${e.duration}ms\n`)
})
