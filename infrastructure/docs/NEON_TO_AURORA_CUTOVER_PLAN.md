# Neon → Aurora MySQL Cutover Plan

This document describes the exact steps to migrate your production server from Neon (Postgres) to Aurora MySQL with minimal downtime and zero code changes.

---

## Phase 1 — Preparation

1. Ensure your Prisma schema is vendor-agnostic.
2. Ensure all database connection strings come from Secrets Manager.
3. Ensure DatabaseStack exists in CDK.
4. Ensure AuthStack reads DB credentials from environment variables.
5. Ensure no Postgres-specific features remain in your schema.

---

## Phase 2 — Deploy Aurora

1. Add a VPC to DatabaseStack.
2. Add an Aurora MySQL cluster to DatabaseStack.
3. Add a Secrets Manager secret for Aurora credentials.
4. Output the Aurora cluster endpoint.
5. Pass the endpoint into AuthStack as an environment variable.
6. Deploy DatabaseStack.
7. Deploy AuthStack.

At this point, Aurora exists but is unused.

---

## Phase 3 — Migrate Data

1. Export Neon data using pg_dump.
2. Convert Postgres schema to MySQL-compatible schema (Prisma helps here).
3. Import data into Aurora using:
   - AWS DMS (recommended), or
   - Manual import via MySQL client.

4. Validate:
   - User accounts
   - Password hashes
   - Refresh tokens
   - Verification tokens
   - Password reset tokens
   - Rate limit table

---

## Phase 4 — Switch Traffic

1. Update the DATABASE_URL secret to point to Aurora.
2. Redeploy AuthStack (Lambdas pick up new env vars).
3. Test:
   - Signup
   - Login
   - Refresh tokens
   - Email verification
   - Password reset
   - Rate limiting

4. Monitor logs for errors.

---

## Phase 5 — Decommission Neon

1. Disable Neon writes.
2. Keep Neon read-only for 48 hours as a fallback.
3. After validation, delete Neon project.
4. Remove Neon secrets from Secrets Manager.

---

## Phase 6 — Optional Multi-Region Expansion

1. Add Aurora Global Database.
2. Add Secrets Manager replication.
3. Deploy AuthStack to a second region.
4. Add Route 53 failover routing.
5. Test regional failover.

---

## Final Result

After completing this plan:

- Your server runs entirely on AWS.
- Your database is Aurora MySQL.
- Your architecture supports multi-region failover.
- Your CDK remains clean and modular.
- Your Lambdas require zero code changes.
