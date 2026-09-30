# AWS_DB_MIGRATION.md
# Migrating from Neon (Postgres) to Aurora MySQL with Minimal CDK Changes

This document explains how to structure your CDK and server code so that migrating from Neon (Postgres) to Amazon Aurora MySQL later will be painless. The goal is to avoid rewriting your infrastructure or application logic when you switch databases.

---

## 1. Keep Database Configuration Outside CDK

Right now, your database is Neon. Later, it will be Aurora MySQL. To avoid rewriting CDK stacks, keep all database connection details in environment variables.

Examples:
- DATABASE_URL
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME

Your CDK should never hardcode database endpoints. It should only inject environment variables into Lambdas.

This allows you to:
- Point Lambdas at Neon today
- Point Lambdas at Aurora later
- Make zero code changes in CDK

---

## 2. Keep Prisma Schema Vendor-Agnostic

Prisma supports both Postgres and MySQL. To avoid painful migrations:

1. Avoid Postgres-only features:
   - JSONB
   - Arrays
   - Postgres-specific operators
   - Postgres-specific extensions

2. Use generic Prisma types:
   - String
   - Int
   - Boolean
   - DateTime
   - Decimal
   - Json (works on both engines)

3. Avoid raw SQL queries unless absolutely necessary.

This ensures your schema can be migrated to MySQL with minimal changes.

---

## 3. Keep DatabaseStack Separate From AuthStack

Even though you are not using Aurora yet, create a placeholder DatabaseStack in CDK:

infrastructure/lib/DatabaseStack.ts

This stack should:
- Define no resources yet
- Export nothing
- Exist only as a future home for Aurora

Your AuthStack should never create or manage database resources. It should only consume environment variables.

Later, when you migrate:
- Add Aurora to DatabaseStack
- Output cluster endpoint
- Pass it into AuthStack via environment variables

No other stacks need to change.

---

## 4. Use Secrets Manager for Credentials Even Before Aurora

Even if Neon uses a static connection string, store it in Secrets Manager now.

Example:
- NEON_DATABASE_URL stored in Secrets Manager
- Lambdas read it at runtime

Later:
- Replace the secret value with Aurora credentials
- No code changes required
- No CDK changes required

This is the single most important step for painless migration.

---

## 5. Keep Lambda Code Database-Agnostic

Your Lambda code should:
- Import PrismaClient from @prisma/client
- Use the shared prisma.ts module
- Never reference Neon-specific features
- Never reference Aurora-specific features

Your Lambda code should not know or care which database it is talking to.

---

## 6. Keep CDK Lambdas Stateless and Region-Agnostic

When you eventually move to Aurora Global Database, your Lambdas will run in multiple regions.

To prepare for this:
- Do not store any state in Lambda
- Do not store any state in API Gateway
- Do not store any state in CDK constructs
- Store all state in the database (Neon now, Aurora later)

This ensures your Lambdas can be deployed to multiple regions without modification.

---

## 7. Prepare for Aurora by Using Environment Variables for Read/Write Separation

Aurora supports:
- Writer endpoint
- Reader endpoint

Neon does not, but you can prepare now.

Define environment variables:
- DB_WRITER_URL
- DB_READER_URL

For Neon:
- Set both to the same value

For Aurora later:
- Set them to different endpoints

Your code can switch automatically without modification.

---

## 8. Keep API Gateway and AuthStack Independent of Database Choice

Your AuthStack should define:
- Lambdas
- API Gateway routes
- Secrets Manager access
- IAM permissions

It should not:
- Create databases
- Create VPCs
- Create subnets
- Create security groups

This separation ensures that migrating the database does not require touching your auth infrastructure.

---

## 9. When Ready to Migrate to Aurora

You will:
1. Add Aurora MySQL to DatabaseStack
2. Add Secrets Manager replication (optional)
3. Add Aurora Global Database (optional)
4. Update the secret value to point to Aurora
5. Redeploy CDK
6. Redeploy Lambdas (no code changes needed)

Your application will immediately begin using Aurora.

---

## 10. Summary

To make migration painless:

- Keep DB config in environment variables
- Use Secrets Manager for all credentials
- Keep Prisma schema vendor-agnostic
- Avoid Postgres-only features
- Keep DatabaseStack separate from AuthStack
- Keep Lambdas stateless and DB-agnostic
- Prepare for read/write separation now
- Do not tie CDK resources to Neon

Following this structure ensures you can switch from Neon to Aurora with minimal effort and zero downtime.

