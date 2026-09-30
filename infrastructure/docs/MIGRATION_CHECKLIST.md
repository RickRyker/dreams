# Migration Checklist: Neon → Aurora MySQL

This checklist ensures your server, CDK, and Prisma setup are ready for a smooth migration from Neon (Postgres) to Aurora MySQL.

---

## 1. Application Code

[ ] Ensure all database connection strings come from environment variables  
[ ] Ensure PrismaClient is created via a shared prisma.ts module  
[ ] Remove any Postgres-specific Prisma features (arrays, JSONB, extensions)  
[ ] Remove any raw SQL that uses Postgres syntax  
[ ] Ensure all tokens (refresh, verification, reset) are stored in tables, not memory  
[ ] Ensure rate limiting uses the database, not in-memory counters  

---

## 2. Prisma Schema

[ ] Confirm all models use vendor-agnostic types  
[ ] Confirm no Postgres-only types are used  
[ ] Confirm no Postgres-only @@index or @@fulltext features  
[ ] Confirm no Postgres-only default() functions  
[ ] Run `prisma migrate dev` to ensure schema is clean  

---

## 3. CDK Structure

[ ] AuthStack does NOT create database resources  
[ ] DatabaseStack exists (even if empty)  
[ ] Lambdas receive DB connection info via environment variables  
[ ] Secrets Manager stores DATABASE_URL  
[ ] No hardcoded DB endpoints in CDK  

---

## 4. Secrets Manager

[ ] Create a secret for Neon DATABASE_URL  
[ ] Lambdas read the secret at runtime  
[ ] Prepare for Aurora by naming the secret generically (e.g., "DatabaseCredentials")  
[ ] Ensure no code references Neon directly  

---

## 5. Deployment Structure

[ ] All Lambdas deployed in a single region (Neon is single-region)  
[ ] No multi-region routing yet  
[ ] No Aurora Global Database yet  
[ ] No VPC required yet  

---

## 6. Preparing for Aurora

[ ] Add VPC + subnets to DatabaseStack (Aurora requires VPC)  
[ ] Add Aurora MySQL cluster to DatabaseStack  
[ ] Add Secrets Manager credentials for Aurora  
[ ] Output cluster endpoint from DatabaseStack  
[ ] Pass endpoint into AuthStack via environment variables  
[ ] Update DATABASE_URL secret to point to Aurora  
[ ] Redeploy Lambdas (no code changes needed)  

---

## 7. Optional Multi-Region Prep

[ ] Keep Lambdas stateless  
[ ] Keep all state in the database  
[ ] Avoid region-specific logic  
[ ] Avoid storing anything in Lambda temp storage  
[ ] Prepare for Aurora Global Database later  

---

## 8. Final Cutover

[ ] Switch DATABASE_URL secret to Aurora  
[ ] Redeploy CDK  
[ ] Redeploy Lambdas  
[ ] Run Prisma migrate on Aurora  
[ ] Test all auth flows  
[ ] Decommission Neon  
