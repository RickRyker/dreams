/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `PetType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `PetType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AchievementCategory" ADD VALUE 'GATHERING';
ALTER TYPE "AchievementCategory" ADD VALUE 'MAGIC';

-- AlterTable
ALTER TABLE "PetType" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PetType_slug_key" ON "PetType"("slug");

-- CreateIndex
CREATE INDEX "PetType_attackType_idx" ON "PetType"("attackType");

-- CreateIndex
CREATE INDEX "PetType_element_idx" ON "PetType"("element");

-- CreateIndex
CREATE INDEX "PetType_family_idx" ON "PetType"("family");

-- CreateIndex
CREATE INDEX "PetType_tier_idx" ON "PetType"("tier");
