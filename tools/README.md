# Tools Directory

This folder contains developer utilities that support schema validation, migration preparation, and other server maintenance tasks. These scripts are not deployed to AWS and are intended for local development or CI use.

---

## prisma_schema_diff.ts

A simple line-by-line diff tool for comparing two Prisma schema files.

### Purpose
- Validate that your Postgres schema (Neon) and MySQL schema (Aurora) remain aligned.
- Detect vendor-specific differences before migration.
- Catch accidental Postgres-only features early.

### Usage

Run manually:

    npm run schema:diff

Or compare arbitrary files:

    ts-node tools/prisma_schema_diff.ts path/to/schemaA.prisma path/to/schemaB.prisma

### Typical Workflow

1. Edit `server/prisma/schema.prisma` (Postgres)
2. Maintain a MySQL-compatible version at `server/prisma/schema-mysql.prisma`
3. Run the diff to ensure compatibility

---

## Future Tools

This directory is the home for additional utilities such as:

- Data migration helpers
- Schema validation scripts
- Code generation utilities
- Aurora migration automation

Keep all developer-only scripts here to maintain a clean server and infrastructure layout.
