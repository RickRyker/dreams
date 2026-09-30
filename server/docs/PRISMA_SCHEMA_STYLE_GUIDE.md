Prisma Schema Style Guide
Internal Engineering Document
Version 1.0 — server & Tools Teams
Purpose
This document defines the required conventions, linting rules, and best practices for authoring and maintaining the Prisma schema used across the MMORPG server. Its goals:

Ensure consistency across all models

Prevent schema drift and migration errors

Reduce relational bugs (e.g., mismatched types)

Improve readability and maintainability

Support distributed, serverless, high‑concurrency architecture

This guide is mandatory for all engineers contributing to the schema.

1. ID & Primary Key Conventions
1.1 Required ID Format
All models MUST use:

id String @id @default(cuid())

Rationale:

Works in distributed systems (Lambda, multi‑region, sharded writes)

Avoids autoincrement contention on Aurora writer

Safe for public API exposure (non‑guessable)

Consistent across all models

Enables offline ID generation for tools/editors

1.2 Foreign Key Type Matching
Foreign keys MUST match the parent type exactly:

regionId String
region   Region @relation(fields: [regionId], references: [id])

Anti‑pattern:

regionId Int?  // mismatched type

1.3 No Autoincrement IDs
Int @id @default(autoincrement()) is prohibited.

Reasons:

Causes write contention

Breaks environment‑to‑environment seeding

Predictable → security risk

Harder to merge data across environments

2. Relation Conventions
2.1 Explicit Relations Only
Every relation MUST specify:

fields

references

onDelete

Example:

creatorId String?
creator   Player? @relation("CreatedMaps", fields: [creatorId], references: [id], onDelete: SetNull)

2.2 Required vs Optional
Optional relation → optional FK:

creatorId String?
creator   Player?

Required relation → required FK:

regionId String
region   Region

2.3 onDelete Rules
Worldbuilding entities (Region → Map): Restrict
Ephemeral child records (events, logs, tiles): Cascade
Optional ownership (creator): SetNull

3. Naming Conventions
3.1 Models
Singular

PascalCase

Examples: Player, Map, Region

3.2 Foreign Keys
Must end with "Id":

playerId
regionId
mapId

3.3 Relation Names
PascalCase, descriptive:

@relation("CreatedMaps")

3.4 Enums
Enum name: PascalCase
Values: SCREAMING_SNAKE_CASE

Example:

enum WildlifeType {
BEES
BIRDS
BUTTERFLIES
}

4. Field Ordering Rules
Every model MUST follow this exact order:

Primary key

Foreign keys

Relation fields

Scalar fields

JSON fields

Timestamps

Bi‑directional relations

Indexes

Correct example:

model Map {
id        String @id @default(cuid())

regionId  String?
region    Region? @relation(fields: [regionId], references: [id])

name      String
width     Int
height    Int

wildLifeTypes  Json?
wildLifeColors Json?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

tiles     MapTile[]
events    MapEvent[]

@@index([regionId])
}

Anti‑patterns:

Timestamps in the middle

JSON fields above scalars

Relation fields scattered

5. JSON Usage Rules
5.1 When JSON is Allowed
Use JSON only for unstructured or mod‑friendly data:

wildlife types

color arrays

arbitrary metadata

dynamic configuration

5.2 When JSON is NOT Allowed
If the data has a known shape, it MUST be a model.

Anti‑pattern:

metadata Json  // contains structured objects

Correct:

model MapMetadata {
id     String @id @default(cuid())
mapId  String
map    Map @relation(fields: [mapId], references: [id])
biome  String
seed   Int
}

6. Enum Rules
Use enums for finite, known sets

Do NOT use enums for user‑generated content

Do NOT use enums for mod‑expandable systems

Enum values must be stable (no renaming after launch)

7. Indexing Rules
7.1 Foreign Keys MUST Be Indexed
@@index([regionId])

7.2 Composite Indexes Must Be Named
@@index([mapId, createdAt], name: "idx_map_createdAt")

7.3 Unique Constraints Must Be Explicit
@@unique([slug])

8. Migration Safety Rules
8.1 Never Change ID Types After Launch
This is a destructive migration.

8.2 Never Rename Fields Directly
Use a 3‑phase migration:

Add new field

Backfill

Remove old field

8.3 Never Drop Columns Without a 2‑Phase Migration
Mark unused

Remove in next deploy

8.4 Never Change Enum Values After Launch
Add new values only.

9. Linting & Automation
9.1 Required Tools
npm install --save-dev prisma-schema-linter eslint-plugin-prisma

9.2 Linter Config
.prisma-schema-linter.json:

{
"rules": {
"id-type": "string-cuid",
"field-order": "strict",
"relation-fields": "required",
"foreign-key-suffix": "Id",
"no-implicit-relations": true,
"no-mixed-id-types": true
}
}

9.3 ESLint Integration
.eslintrc:

{
"plugins": ["prisma"],
"extends": ["plugin:prisma/recommended"]
}

9.4 CI Enforcement
npx prisma-schema-linter ./prisma/schema.prisma

10. Anti‑Patterns (Do Not Do This)
Mixed ID types:

id Int @id @default(autoincrement())
regionId String?

Implicit relations:

region Region?

JSON for structured data:

stats Json  // contains { hp: 10, mp: 5 }

Missing indexes on FK fields:

regionId String  // no @@index

Timestamps in random positions:

name String
createdAt DateTime
width Int

11. Example of a Fully Compliant Model
model Region {
id          String @id @default(cuid())

slug        String @unique
name        String

createdAt   DateTime @default(now())
updatedAt   DateTime @updatedAt

dishes      RegionalDish[]
ingredients RegionalIngredient[]
maps        Map[]
}

12. Versioning & Governance
Changes to this document require approval from server Lead + Tools Lead

Schema changes must follow the Schema Change Proposal (SCP) process

All new models must be reviewed before merge